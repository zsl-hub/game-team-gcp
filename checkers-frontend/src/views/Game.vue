<template>

  <!-- <RouterLink to="/">Menu</RouterLink> -->
  <main>



    <div class="Chat" name="Chat">
      <input type="text" name="Content" id="content" maxlength="20">
      <input type="Submit" value="Send">

    </div>

    <div class="table">

      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>
      <div class="checker RedChecker"> </div>

      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>
      <div class="checker BlackChecker"> </div>


      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>


      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>


      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>


      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>


      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>


      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>


      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>


      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>
      <div class="square WhiteSquare"> </div>
      <div class="square BlackSquare"> </div>

    </div>



    <div class="Options">
      <div class="FirstPlayer">
        <label for="username">1 Player </label>
        <InputText id="FirstUsername" v-model="value" />

      </div>


      <div class="Surrender">
        <Button class="SurrenderButton" aria-label="Submit"> 🏳️</Button>

      </div>


      <div class="SecondPlayer">
        <label for="username">2 Player</label>
        <InputText id="SecondUsername" v-model="value" />

      </div>
    </div>

  </main>
</template>
<style>
main {
  background: rgb(3, 1, 27);
  display: grid;
  grid-template-columns: 25% 50% 25%;
  width: 100%;
  height: 100vh;
  padding: 0;
}

.square {
  float: left;
  width: 5rem;
  height: 5rem;
}

.WhiteSquare {
  background-color: #08440d;
}

.BlackSquare {
  background-color: rgba(255, 255, 255, 0.678);
}


.table {
  position: relative;
  width: 40rem;
  height: 40rem;
  margin: 0 auto;
}


.checker {
  top: 0.5rem;
  left: 0.4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;

}

.RedChecker {
  background: rgb(214, 29, 29);
  border: 1px solid black;

}

.BlackChecker {
  background: black;
  border: 1px solid white;
}


.ChatContainer {
  align-content: end;
  border: 2px solid black;

}

.SendButton {
  border: 1px solid blue;
  background-color: white;
  color: rgb(36, 161, 222);
  font-size: 150%;
}

.FirstPlayer {
  text-align: center;
}

.SecondPlayer {
  text-align: center;
}

.Surrender {
  text-align: center;
}

.SurrenderButton {
  background-color: #193102;
  font-size: 200%;

}




</style>



<script setup>

import InputText from 'primevue/inputtext';

import Button from 'primevue/button';

 
    
</script>