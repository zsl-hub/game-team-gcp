<script setup>
    import Card from 'primevue/card';
    import SelectButton from 'primevue/selectbutton';
    import InputText from 'primevue/inputtext';
    import Button from 'primevue/button';
    import { ref } from 'vue';
    
const options = ref(['Random', 'Red', 'Black']);

const rooms = ref([]);
const newRoomName = ref('');



const createRoom = () => {
  rooms.value.push({ name: newRoomName.value, players: 1 });
  newRoomName.value = '';


};

</script>


<template>

<Card id="Form">
    <template #title>BOARD</template>
    <template #content>
      <p class="m-0">
        <InputText name="username" id="username" aria-describedby="username-help" /><br>
        <small id="username-help">Enter board name.</small><br><br>
        <SelectButton name="SelectButton" v-model="value" :options="options" aria-labelledby="basic" /><br>
      <div class="CreateButtonContainer">
        <Button name="CreateButton" class="CreateButton" label="Create" text raised @click="createRoom()"></Button>
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
          <div class="RoomName">RoomName {{ index + 1 }}</div>
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

 </template>