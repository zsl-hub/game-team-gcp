<script setup>
    import Card from 'primevue/card';
    
</script>

<template>
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