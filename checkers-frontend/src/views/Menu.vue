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

  header{
    text-align: center;
    font-size: 200%;
    font-weight: bold;
  }

  #List{
    float: left;
    width: 30%;
    height: 100%;
    border: 3px solid black;
    padding: 10px;
  }

  #Room{
    border: 3px solid black;
    padding: 10px;
  }

  #RoomName{
    
  }

  #Join{
    
  }

  #Amount{
    
  }

  #Form{
    float: right;
    border: 3px solid black;
    width: 70%;
    height: 60%;
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
    height: 40%;
    padding: 10px;
  }

</style>

<script>
  

  

</script>