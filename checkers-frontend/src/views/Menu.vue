<template>
  <header>
    CHECKERS
  </header>

  <FormAndList></FormAndList>

  <Rules></Rules>
</template>

<script setup>
import FormAndList from "../components/FormAndList.vue"
import Rules from '../components/Rules.vue'

</script>





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
