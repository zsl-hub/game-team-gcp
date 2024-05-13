<script setup>
</script>
<template>

   <!-- <RouterLink to="/">Menu</RouterLink> -->
  <main>
   


      <div class="ChatContainer">        <div class="Chat" name="Chat">
          <input type="text" name="Content" id="content" maxlength="20">
        <input type="Submit" value="Send">
        </div>

      </div>

    
        <div class="table">

<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>	
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>
<div class="checker WhiteChecker"> </div>	

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
    display: grid;
    grid-template-columns: 25% 50% 25%;
		width: 100%;
		height : 100vh;
		padding: 0;
}
.square{
	float: left;
	width: calc(100%/8);;
	height: 7.5vh;
}

.WhiteSquare{
	background-color:white;
}
.BlackSquare{
	background-color :rgb(92, 179, 92);
}


.table{
  border: 4px solid black;
	position: relative;
	width: 34vw;
	height: calc(7.5vh*8.1);
	margin: 0 auto;
}


.checker{
	top:10px;
	left:10px;
	width: 54px;
	height: 54px;
	border-radius: 50%;
	position: absolute;	
	cursor: pointer;	

}

.WhiteChecker{
	background: white;
  border: 1px solid black;
  
}

.BlackChecker{
	background: black; 
  border: 1px solid white;
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
}
    
  </style>