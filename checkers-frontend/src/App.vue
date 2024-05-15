<script>
  import { RouterView } from 'vue-router';
  // import axios from 'axios';


// async function sendFormDataToBackend(formData) {
//   try {
    
//     const response = await axios.post('http://localhost:8080/api/v1/Room/', formData);
    
//     console.log('Odpowiedź z serwera:', response.data);  return response.data;
//   } catch (error) {
//     console.error('Błąd podczas wysyłania danych:', error);
//     throw error;
//   }
// }


// const formData = {
//   roomName: 'Nazwa pokoju',
//   startingColor: 'Kolor początkowy'
// };

// sendFormDataToBackend(formData);



// export default {
  
//   data() {
//     return {
//       roomName: '',
//       startingColor: ''
//     };
//   },
//   methods: {
//     async submitFormData() {
//       const formData = {
//         roomName: this.roomName,
//         startingColor: this.startingColor
//       };

//       try {
//         await sendFormDataToBackend(formData);
        
//         this.roomName = '';
//         this.startingColor = '';
//       } catch (error) {
        
//         console.error('Błąd wysyłania danych do backendu:', error);
//       }
//     }
//   }
  
// };

</script>

<template>
  <!-- <form @submit.prevent="submitFormData">
    <input v-model="roomName" type="text" placeholder="Nazwa pokoju">
    <input v-model="startingColor" type="text" placeholder="Kolor początkowy">
    <button type="submit">Wyślij</button>
  </form> -->
  <RouterView></RouterView>
  
</template>


<style scoped>

</style>
