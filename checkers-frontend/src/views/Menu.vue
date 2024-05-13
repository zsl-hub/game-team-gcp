<template>
  <header>
    CHECKERS
  </header>



  <Card id="List">
    <template #title>ROOM LIST</template>
    <template #content>
      <p class="m-0">
      <div id="Room">
        <div id="Left">
          <div id="RoomName" name="RoomName">RoomName 1</div>
          <br>
          <div id="Amount" name="Amount">Players: 1/2</div>
        </div>

        <div id="Right">
          <RouterLink to="/Game"> <Button label="Submit" id="Join">JOIN</Button> </RouterLink>
        </div>




      </div><br><br>

      <Divider id="Divider" /><br><br>

      <div id="Room">
        <div id="Left">
          <div id="RoomName" name="RoomName">RoomName 2</div>
          <br>
          <div id="Amount" name="Amount">Players: 2/2</div>
        </div>

        <div id="Right">
          <RouterLink to="/Game"> <Button label="Submit" id="Join">JOIN</Button> </RouterLink>
        </div>


      </div>
      </p>
    </template>
  </Card>


  <Card id="Form">
    <template #title>BOARD</template>
    <template #content>
      <p class="m-0">

        <InputText name="username" id="username" aria-describedby="username-help" /><br>
        <small id="username-help">Enter board name.</small><br><br>

        <SelectButton name="SelectButton" v-model="value" :options="options" aria-labelledby="basic" /><br>

        <div class="CreateButtonContainer">
          <Button name="CreateButton" class="CreateButton" label="Create" text raised />
        </div>

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

  import Card from 'primevue/card';
  import Divider from 'primevue/divider';
  import Button from 'primevue/button';

  import SelectButton from 'primevue/selectbutton';
  import InputText from 'primevue/inputtext'

  import { ref } from 'vue';
  const value = ref('Random');
  const options = ref(['Random', 'Red', 'Black']);

</script>