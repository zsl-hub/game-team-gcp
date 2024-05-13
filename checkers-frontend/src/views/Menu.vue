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

          <Divider id="Divider"/><br><br>

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

  <div id="Form">
    <div id="formHeader">Board</div>

    <label for="CreateName">Name:</label> <input type="text" name="CreateName" id="CreateName"> <br>

    <label for="ChatCheck" hidden>Chat:</label><input type="checkbox" name="ChatCheck" id="ChatCheck" hidden> <br>

    <div id="Buttons">
      Play as:

      <select name="Choice" id="Choice">
        <option>Red</option>
        <option>Black</option>
        <option>Random</option>
      </select>
    </div>
      
    
    
  </div>

  <div id="Rules">
    Rules:

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
  *{
    color: rgba(255, 255, 255, 0.87);
  }
  
  header{
    text-align: center;
    font-size: 200%;
    font-weight: bold;
    height: 4vh;
  }

  #List{
    float: left;
    width: 30%;
    height: 96vh;
    padding: 10px;
    overflow: auto;
  }

  #Room{
    border: 3px solid #818cf8;
    border-radius: 10px;
    padding: 1vw;
    display: grid;
    grid-template-columns: 75% 25%;
  }

  #Join{
    margin: 5% 0 5% 0;
  }

  #Form{
    float: right;
    border: 3px solid black;
    width: 70%;
    height: 60vh;
    padding: 10px;
  }

  #formHeader{
    text-align: center;
    font-size: 150%;
    font-weight: bold;
  }

  #Rules{
    float: right;
    border: 3px solid black;
    width: 70%;
    height: 36vh;
    padding: 10px;
  }

</style>

<script setup>
  import Card from 'primevue/card';
  import Divider from 'primevue/divider';
  import Button from 'primevue/button';
  

</script>