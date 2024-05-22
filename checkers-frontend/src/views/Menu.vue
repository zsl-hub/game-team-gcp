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
            <Button label="Submit" id="Join" @click="JoinRoom(room.roomId, room.player1Id)">JOIN</Button>
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
import { v4 as uuidv4 } from 'uuid';

const options = ref(['Random', 'Red', 'Black']);
const router = useRouter();
let roomId = ref(null);

onMounted(async () => {
  if ($cookies.get("playerId") == null) {
    $cookies.set('playerId', uuidv4(), "1h");
  }

  await refreshRooms();
});


async function JoinRoom(roomId, player1Id) {
  try {
    const socket = io(import.meta.env.VITE_BACK_HOST);

    const response = await axios.post(`${import.meta.env.VITE_BACK_HOST}/api/v1/game/join/`, {
      player1Id: player1Id,
      player2Id: $cookies.get("playerId"),
      roomId: roomId
    });

    window.location = `/Game/${roomId}`

    console.log('Response data:', response.data);
    state.rooms = response.data;

  } catch (error) {
    console.log(error);
  }
};
</script>

<script>
import io from 'socket.io-client';

const rooms = ref([]);

const refreshRooms = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_BACK_HOST + '/api/v1/getAllAvailableRooms/');
    state.rooms = response.data;
    const roomIds = state.rooms.map(room => room.roomId);
  } catch (error) {
    console.error("Couldn't refresh the room list", error);
  }
};

let state = reactive({
  boardName: '',
  selectColor: '',
  isCreatingRoom: false,
});

export default {
  data() {
    return {
      rooms: [],
      messages: [],
      socket: null // Define socket as a component property
    };
  },

  methods: {
    async createRoom() {
      rooms.value.push({ name: this.boardName, players: 1, delete: false });
      await refreshRooms();
    },

    async newRoom() {
      try {
        console.log($cookies.get("playerId"))
        const response = await axios.post(import.meta.env.VITE_BACK_HOST + '/api/v1/Room/createRoom', {
          roomName: this.boardName,
          startingColor: this.selectColor,
          isAvailable: true,
          player1Id: $cookies.get("playerId")
        });
        console.log(response.data)
        window.location = `/Game/${response.data.roomId}`
        state.isCreatingRoom = true;
        await refreshRooms();
      } catch (error) {
        console.error("Couldn't get all available rooms", error);
      }
    },
  }
}
</script>