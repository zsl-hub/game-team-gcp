<template>

  <header>
    CHECKERS
  </header>

  <!-- <FormAndList></FormAndList> -->
  <Card id="Form">
    <template #title>BOARD</template>
    <template #content>

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
            <!-- Delete Room:<input type='checkbox' v-model="room.delete" /> -->
          </div>
          <div class="Right">
            <RouterLink to='Game/{{ room.roomId }}'>
              <Button label="Submit" id="Join" @click="JoinRoom(room.roomId)">JOIN: </Button>
            </RouterLink>
          </div>
        </div>

      </div><br><br>
      </p>

    </template>

  </Card>

  <!-- <Rules></Rules> -->

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
  border: 1px solid #818cf8;
  border-radius: 6px 0 0 6px;
}


#Room {
  border: 3px solid #818cf8;
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
  border: 1px solid #818cf8;
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
  border: 3px solid #818cf8;
  border-radius: 10px;
  font-size: 2rem;
  width: 16rem;
  height: 6rem;
  background: #818cf8;
}

.ButtonsContainer {
  display: flex;
  justify-content: center;
  gap: 2rem;


}

.DeleteButton {
  text-align: center;
  border: 3px solid #818cf8;
  width: 12rem;
  height: 5rem;
  border-radius: 10px;
  font-size: 2rem;
  background: #818cf8;
}


#Rules {
  font-size: 1.5rem;
  float: right;
  border: 1px solid #818cf8;
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
const options = ref(['Random', 'Red', 'Black']);





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
// const boardName = ref('');
// const selectedColor = ref('');

const rooms = ref([]);

let state = reactive({
  boardName: '',
  selectColor: '',
  isCreatingRoom: false,
});
// const createRoom = () => {
// rooms.value.push({ name: this.boardName, players: 1 });
// newRoomName.value = '';
// };
var checkedIndexes = [];

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
// const JoinRoom = async () => {
//   try {
//     const response = await axios.get('http://localhost:8080/api/v1/Room/');
//     state.rooms = response.data;



//   } catch (error) {
//     console.log(error);
//   }
// };


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


    // DeleteRoom() {
    //   console.log('deletion started');
    //   this.rooms.forEach((rm, index) => {
    //     if (rm.delete) {
    //       checkedIndexes.push(index);
    //     }
    //   });
    //   console.log('deletion in progres', checkedIndexes);

    //   // Iterate over the checked indexes and remove corresponding rooms
    //   checkedIndexes.forEach((index) => {
    //     // Use `rooms` instead of `rooms.value` if you're directly accessing it from Vue data
    //     rooms.value.splice(index, 1);
    //   });


    // const index = rooms.value.findIndex(room => room.name === newRoomName.value);
    // if (index !== -1) {
    //   rooms.value.splice(index, 1);
    // }
    // newRoomName.value = '';
    // },

    JoinRoom(roomId) {
    
    this.$router.push({ name: 'Game', params: { roomId: roomId }});
  },


    async createRoom() {
      console.log('testing this: ', this)
      rooms.value.push({ name: this.boardName, players: 1, delete: false });
      await refreshRooms();

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
