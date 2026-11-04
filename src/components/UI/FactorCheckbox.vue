<template>
  <q-checkbox
    v-model="model"
    dense
    toggle-order="ft"
    color="primary"
  ></q-checkbox>
</template>

<script setup>
const model = defineModel();
</script>
