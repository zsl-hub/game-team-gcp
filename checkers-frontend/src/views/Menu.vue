<template>
  <header>
    CHECKERS
  </header>
  <!-- <FormAndList></FormAndList> -->
  <Card id="Form">
    <template #title>BOARD</template>
    <template #content>
      <ChildComponent :roomId="roomId" />
      <p class="m-0" v-if='!state.isCreatingRoom'>
        <InputText name="BoardName" id="BoardName" v-model="boardName" aria-describedby="username-help" /><br>
        <small id="username-help">Enter board name.</small><br><br>
        <SelectButton name="SelectButton" v-model="selectColor" :options="options" aria-labelledby="basic" /><br>
      <div class="CreateButtonContainer">
        <Button name="CreateButton" class="CreateButton" label="Create" text raised
          @click="createRoom(), newRoom(), refreshRooms()"></Button>
      </div>
      </p>
      <p class='Waiting' v-else>
        Waiting For Opponent
      </p>
    </template>
  </Card>

  <Card id="List">
    <template #title>ROOM LIST</template>
    <template #content>
      <p class="m-1">
      <div class="RoomList" v-if="state.rooms">

        <div v-for="(room, index) in state.rooms" :key="index" id="Room">
          <div class="Left">
            <div class="RoomName">RoomName: {{ room.roomName }}</div>
            <div class="Amount">Players: 1/2</div>
          </div>
          <div class="Right">
            <Button label="Submit" id="Join" @click="JoinRoom(room.roomId)">JOIN</Button>
          </div>
        </div>
      </div><br><br>
      </p>
    </template>
  </Card>

  <Card id="Rules">
    <template #title>Rules</template>
    <template #content>
      <p class="m-0">
      <ul>
        <li>Board 8x8</li>
        <li>Short moves only</li>
        <li>Cannot capture backwards</li>
        <li>Capture - choose any</li>
        <li>Red is playing first</li>
      </ul>
      </p>
    </template>
  </Card>
</template>

<style>
* {
  color: rgba(255, 255, 255, 0.87);
}

header {
  text-align: center;
  font-size: 200%;
  font-weight: bold;
  height: 4vh;
}

#List {
  float: left;
  width: 30%;
  height: 96vh;
  padding: 10px;
  overflow-y: scroll;
  border: 1px solid #818CF8;
  border-radius: 6px 0 0 6px;
}

#Room {
  border: 3px solid #818CF8;
  border-radius: 10px;
  padding: 1vw;
  display: grid;
  grid-template-columns: 75% 25%;
}

#Join {
  margin: 5% 0 5% 0;
}

#Form {
  height: 60vh;
  float: right;
  width: 70%;
  border: 1px solid #818CF8;
  padding: 10px;
  border-radius: 0 6px 0 0;
}

#formHeader {
  text-align: center;
  font-size: 150%;
  font-weight: bold;
}

.CreateButtonContainer {
  text-align: center;
  margin-top: 10%;
}

.CreateButton {
  border: 3px solid #818CF8;
  border-radius: 10px;
  font-size: 2rem;
  width: 16rem;
  height: 6rem;
  background: #818CF8;
}

.ButtonsContainer {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.DeleteButton {
  text-align: center;
  border: 3px solid #818CF8;
  width: 12rem;
  height: 5rem;
  border-radius: 10px;
  font-size: 2rem;
  background: #818CF8;
}

#Rules {
  font-size: 1.5rem;
  float: right;
  border: 1px solid #818CF8;
  border-radius: 0 0 6px 0;
  width: 70%;
  height: 36vh;
  padding: 10px;
}

.RoomList {
  margin-top: 2rem;
  display: grid;
  gap: 2rem;
}

.Waiting {
  font-size: 5rem;
  margin-top: 10rem;
  margin-left: 18rem;
}
</style>

<script setup>
import Card from 'primevue/card';
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref } from 'vue';
import axios from 'axios';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from './store.js';

const options = ref(['Random', 'Red', 'Black']);
const router = useRouter();
let roomId = ref(null);

async function JoinRoom() {
  try {
    $cookies.set('player', 'player2', '1h');
    const player = $cookies.get('player');
    console.log('Player from cookies:', player);

    const response = await axios.get('http://localhost:8080/api/v1/game/');
    console.log('Response data:', response.data);

    state.rooms = response.data;

    if (response.data && Array.isArray(response.data)) {
      response.data.forEach(room => {
        let playerId;
        if (player === 'player1') {
          playerId = room.player1Id;
        } else if (player === 'player2') {
          playerId = room.player2Id;
        }
        console.log('Player ID:', playerId);
        router.push(`Game/${room.roomId}&&${playerId}`);
        store.roomId = room.roomId;
        console.log(store.roomId);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const socket = io('http://localhost:8080');

  socket.on('onMessage', (message) => {
    state.messages.push(message);
    socket.emit('message', {
      msg: 'my new message',
      content: message,
    });
  });
  await refreshRooms();
});
</script>


<script>
import io from 'socket.io-client';

const rooms = ref([]);

let state = reactive({
  boardName: '',
  selectColor: '',
  isCreatingRoom: false,
});

const refreshRooms = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/getAllAvailableRooms/');
    state.rooms = response.data;
    const roomIds = state.rooms.map(room => room.roomId);
    console.log(roomIds);
  } catch (error) {
    console.error("Couldn't refresh the room list", error);
  }
};

export default {
  data() {
    return {
      rooms: [],
      messages: [],
      socket: null // Define socket as a component property
    };
  },

  async mounted() {
    refreshRooms()
    // Connect to the Socket.IO server
    const socket = io('http://localhost:8080'); // Change the URL to your backend URL
    // Listen for messages from the server
    console.log("before");
    socket.on('onMessage', (message) => {
      console.log('front onMessage'),
        this.messages.push(message),
        socket.emit('message', {
          msg: 'my new message',
          content: message,
        });
      console.log("0weifji0ewr", message);
    });
  },

  methods: {
    async createRoom() {
      console.log('testing this: ', this)
      rooms.value.push({ name: this.boardName, players: 1, delete: false });
      await refreshRooms();
    },

    JoinRoom(roomId) {
      this.$cookies.set('player', 'player2', '1h');
      this.$router.push({ name: 'Game', params: { roomId: roomId } });
    },

    async createRoom() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/Room/', {
          roomName: this.boardName,
          startingColor: this.selectColor,
          isAvailable: 1,
        });

        const player1Id = response.data.player1Id;
        this.$cookies.set('player', 'player1', '1h');
        this.$router.push({ name: 'Game', params: { roomId: response.data.roomId, playerId: player1Id } });
        await refreshRooms();
        state.isCreatingRoom = true;
      } catch (error) {
        console.error("Couldn't create room", error);
      }
      console.log('testing this: ', this)
      rooms.value.push({ name: this.boardName, players: 1, delete: false });
    },

    async newRoom() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/Room/', {
          roomName: this.boardName,
          startingColor: this.selectColor,
          isAvailable: 1,
        });
        state.isCreatingRoom = true;
        await refreshRooms();
      } catch (error) {
        console.error("Couldn't get all available rooms", error);
      }

      console.log('starting ')
      const socket = io('http://localhost:8080');
      console.log("test connect");
      console.log(this);
      const boardName = this.boardName;
      const playerColor = this.selectColor;
      console.log("color: ", playerColor);
      console.log("baordname: ", boardName);
      socket.emit('boardCreationData', {
        msg: 'trying',
        playerColor: playerColor,
        boardName: boardName
      });
    },
  }
}
</script>