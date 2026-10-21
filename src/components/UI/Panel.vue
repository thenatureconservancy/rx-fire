<template>
  <div id="panel">
    <q-scroll-area style="height: 100%; max-width: 300px">
      <div>
        <q-btn
          icon="close"
          square
          dense
          flat
          color="red"
          class="q-mx-sm"
          @click="ms.rightPanelVis = !ms.rightPanelVis"
        >
          <q-tooltip
            class="bg-white text-primary text-h7 shadow-4"
            style="border: 1pt solid #ccc"
            anchor="center right"
            self="center start"
            >Close</q-tooltip
          >
        </q-btn>
      </div>
      <div class="text-center">Management Goals Summary</div>
      <div>
        <q-btn
          class="q-ml-sm"
          spread
          color="primary"
          label="Save Summary"
          icon="file_download"
          square
          unelevated
          style="position: absolute; bottom: 10px; width: 100%"
        />
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { useMapStore } from '../../store/index';

const ms = useMapStore();
</script>

<style scoped>
#panel {
  width: 300px;
  height: 100%;
  background-color: white;
  /* box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2); */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.panel-content {
  padding: 20px;
}
</style>
