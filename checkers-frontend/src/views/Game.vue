<script setup>
</script>
<template>
   <RouterLink to="/">Menu</RouterLink>
  <main>
   
      <div class="ChatContainer">
        <div class="Chat" name="Chat">
          <input type="text" name="Content" id="content" maxlength="20">
        <input type="Submit" value="Send">
        </div>
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
      font-family: italic;
      display: grid;
      grid-template-columns: 25% 50% 25%;
      margin: 0;
      padding: 0;
    }
    .ChatContainer{
      border: 2px solid black;
    }
    .Chat{
      display: flex;
      justify-content: end;
    }
    .BoardContainer{
      border: 2px solid black;
    }
    .Options{
      border: 2px solid black;
    }
  </style>
