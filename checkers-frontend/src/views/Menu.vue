<template>
  <header>
    CHECKERS
  </header>

  <!-- <FormAndList></FormAndList> -->

  <Card id="Form">
    <template #title>BOARD</template>
    <template #content>
      <p class="m-0">
        <InputText name="username" id="username" v-model="boardName" aria-describedby="username-help" /><br>
        <small id="username-help">Enter board name.</small><br><br>
        <SelectButton name="SelectButton" v-model="selectColor" :options="colorValues" aria-labelledby="basic" /><br>
      <div class="CreateButtonContainer">
        <Button name="CreateButton" class="CreateButton"  label="Create" text raised @click="newRoom(), createRoom() "></Button>
      </div>
      </p>
    </template>
  </Card>


  <Card id="List">
    <template #title>ROOM LIST</template>
    <template #content>
      <p class="m-0">

      <div v-for="(room, index) in rooms" :key="index" id="Room">
        <div class="Left">
          <div class="RoomName">RoomName: {{ room.name}}</div>
          <div class="Amount">Players: {{ room.players }}/2</div>
        </div>
        <div class="Right">
          <RouterLink to="/Game">
            <Button label="Submit" id="Join">JOIN</Button>
          </RouterLink>
        </div>

      </div>




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
  overflow: auto;
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
  font-size: 200%;
  width: 12vw;
  height: 8vh;
  background: #818cf8;
}

#Rules {
  float: right;
  border: 1px solid #818cf8;
  border-radius: 0 0 6px 0;
  width: 70%;
  height: 36vh;
  padding: 10px;
}
</style>

<script setup>
  // import FormAndList from "../components/FormAndList.vue"
  // import Rules from '../components/Rules.vue'



  import Card from 'primevue/card';
  import Divider from 'primevue/divider';
  import Button from 'primevue/button';

  import SelectButton from 'primevue/selectbutton';
  import InputText from 'primevue/inputtext'

  import { ref } from 'vue';

  
//   const rooms = ref([]);
//   const newRoomName = ref('');

//   const colorValues = ref(['Random', 'Red', 'Black']);

//   const createRoom = () => {
//   rooms.value.push({ name: newRoomName.value, players: 1 });
//   newRoomName.value = '';


// };

</script>

<script>
  import { ref } from 'vue';
  import io from 'socket.io-client';
  // const boardName = ref('');
  // const selectedColor = ref('');

  const rooms = ref([]);
  const newRoomName = ref('');

  const colorValues = ref(['Random', 'Red', 'Black']);

  // const createRoom = () => {
  // rooms.value.push({ name: this.boardName, players: 1 });
  // newRoomName.value = '';


  // };


  export default {
      
    data() {
      return {
        messages: [],
        socket: null // Define socket as a component property
      };
    },
    
    mounted() {
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
        console.log( "0weifji0ewr", message );
      });
    },
    methods:{
      createRoom(){
        console.log('testing this: ', this)
        rooms.value.push({ name: this.boardName, players: 1 });
        // newRoomName.value = '';

      },
      newRoom(){
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
      }
  }
}


</script>