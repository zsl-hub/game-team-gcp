<template>
  <header>
    Play Checkers
  </header>

  <div id="List">
    <div id="Room">

      <div id="RoomName" name="RoomName">RoomName</div>

      <RouterLink to="/Game"> <button>JOIN</button> </RouterLink>
      
      <div id="Amount" name="Amount">Amount 0/2</div>
    </div>
  </div>
<Card>
  <div id="Form">
    <div id="formHeader">Board</div>
 
            <InputText name="username" id="username" v-model="value" aria-describedby="username-help" /><br>
            <small  id="username-help">Enter your username to reset your password.</small><br><br>
        
                <SelectButton   name="SelectButton" v-model="value" :options="options" aria-labelledby="basic" /><br>
<div class="CreateButtonContainer">
  <Button name="CreateButton" class="CreateButton" label="Create" text raised /> 
</div>
        
  </div>
</Card>
  <div id="Rules">
    <div class="RulesText">Rules:</div>

    <ul>
      <li>Board 8x8</li>
      <li>Short moves only</li>
      <li>Cannot capture backwards</li>
      <li>Capture - choose any</li>
      <li>Red is playing first</li>
    </ul>
  </div> 
  
</template>

<style>
 
  
  main{
    margin: 0;
    padding: 0;
  }
 
  header{
    height: 4vh;
    text-align: center;
    font-size: 200%;
    font-weight: bold;
  }

  #List{
    float: left;
    width: 30%;
    height: 96vh;
    border: 3px solid black;
    padding: 10px;
  }

  #Room{
    border: 3px solid black;
    padding: 10px;
  }

  #Form{
    height: 60vh;
    float: right;
    width: 70%;
    
    padding: 10px;
  }

  #formHeader{
    text-align: center;
    font-size: 150%;
    font-weight: bold;
  }
  .CreateButtonContainer{
    text-align: center;
    margin-top: 32vh;
    
  }
  .CreateButton{
    border: 2px solid blue;
    border-radius: 10px;
    font-size: 200%;
    width: 8vw;
    height: 8vh;
  }

 

  #Rules{
    float: right;
    font-size: 120%;
    
    border: 3px solid black;
    width: 70%;
    height: 36vh;
    padding: 10px;
  }
  li{
    gap: 100px;
  }
  .RulesText{
    font-size: 180%;
    text-align: center;
  }

</style>

<script setup>
  
import SelectButton from 'primevue/selectbutton';

import Button from 'primevue/button';

import InputText from 'primevue/inputtext'

import { ref } from 'vue';




const options = ref(['Black', 'Red', 'Random']);

  





</script>