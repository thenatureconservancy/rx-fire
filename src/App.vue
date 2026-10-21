<template>
  <div class="q-pa-sm" style="border-radius: 15px !important">
    <TheHeader class="q-mb-sm"></TheHeader>
    <q-splitter
      v-model="ms.splitterModel"
      :style="
        !smallScreen
          ? 'height: calc(100vh - 74px)'
          : 'height: calc(100vh - 66px); width: 100%; position: absolute'
      "
      :disable="smallScreen"
      :horizontal="smallScreen"
      separator-style="background-color: transparent"
      :limits="[0, 100]"
    >
      <template v-slot:before>
        <div v-if="ms.leftPanelVis">
          <div v-if="!smallScreen">
            <TheLeftPanel></TheLeftPanel>
          </div>
          <div v-else>
            <TheMap></TheMap>
          </div>
        </div>
        <div v-else></div>
      </template>
      <template v-slot:after>
        <div v-if="!smallScreen" class="after-wrapper">
          <div class="map-panel-wrapper">
            <TheMap></TheMap>
          </div>
          <div class="panel-container">
            <transition name="slide">
              <Panel v-if="ms.rightPanelVis"></Panel>
            </transition>
          </div>
        </div>
        <div class="q-ma-lg" v-else style="height: 65% !important">
          <TheLeftPanel></TheLeftPanel>
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useMapStore } from './store/index';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-legend';
import '@arcgis/map-components/components/arcgis-scale-bar';
import '@arcgis/map-components/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-expand';
import '@arcgis/map-components/components/arcgis-basemap-toggle';
import '@arcgis/map-components/components/arcgis-basemap-gallery';
import '@arcgis/map-components/components/arcgis-home';
import TheHeader from './components/TheHeader.vue';
import TheMap from './components/TheMap.vue';
import TheLeftPanel from './components/TheLeftPanel.vue';
import Panel from './components/UI/Panel.vue';

const ms = useMapStore();
const $q = useQuasar();
let smallScreen = computed(() => $q.screen.lt.sm);
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__mask--expanded {
    display: none;
  }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
    top: 100px;
  }
  .esri-view-width-xsmall
    .esri-expand--auto
    .esri-expand__container--expanded
    .esri-expand__panel {
    padding: 2px;
  }
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.after-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  gap: 0;
}

.map-panel-wrapper {
  flex: 1;
  height: 100%;
  position: relative;
  display: grid;
}
.map-panel-wrapper > * {
  height: 100%;
  overflow: hidden;
}

.panel-container {
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
}

:deep(.q-splitter__after) {
  overflow: hidden;
}
</style>
