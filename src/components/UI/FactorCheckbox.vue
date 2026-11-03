<template>
  <q-checkbox
    v-model="model"
    dense
    toggle-order="ft"
    color="primary"
  ></q-checkbox>
</template>

<script setup>
import { ref } from "vue";
import { useMapStore } from "../../store/index";
const ms = useMapStore();

const model = ref(false);
</script>
