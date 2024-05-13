<template>
  <main>
   
      <div class="ChatContainer">

        <div class="Chat" name="Chat"></div>

        <input type="text" name="Content" id="content" maxlength="20">

        <input type="Submit" value="➤" class="SendButton">

  
      </div>


      <div class="BoardContainer" name="BoardContainer">

        <div class="Board" name="Board"></div>

      </div>


      <div class="Options" name="Options">

        <label for="">Player 1</label>

        <input type="text" name="Player1Name" id="Player1">

        <label for="">Player 2</label>

        <input type="text" name="Player2Name" id="Player2">

      </div>

  </main>
  
</template>


<style>



    main{
      margin: 0;
      padding: 0;
      height: 100vh;
      font-family: italic;
      display: grid;
      grid-template-columns: 25% 50% 25%;
      
    } 
    .ChatContainer{
      
      align-content: end;
      border: 2px solid black; 
      
    }
    
    .SendButton{
      border: 1px solid blue;
      background-color: white;
      color: rgb(36, 161, 222);
      font-size: 150%;
      width: 4vw;
      height: 3vh;
    }
    .BoardContainer{
      border: 2px solid black;
    }
    .Options{
      border: 2px solid black;
    }
  </style>


<script setup>



</script>