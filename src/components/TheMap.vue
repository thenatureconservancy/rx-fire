<template>
  <arcgis-map
    id="map"
    item-id="1244af1f8bdd4af3b6df08697b31f571"
    @arcgisViewReadyChange="onReady"
  >
    <arcgis-scale-bar position="bottom-right" unit="dual"></arcgis-scale-bar>
    <arcgis-expand close-on-esc position="top-right" mode="floating">
      <arcgis-basemap-gallery
        position="top-right"
        :source="source"
      ></arcgis-basemap-gallery>
    </arcgis-expand>
    <arcgis-home position="top-left"></arcgis-home>
    <arcgis-zoom position="top-left"></arcgis-zoom>
  </arcgis-map>

  <q-btn
    icon="layers_outlined"
    class="bg-white shadow-1"
    square
    :ripple="false"
    @click="toggleLegend"
    style="
      display: block;
      position: absolute;
      height: 32px;
      width: 35px;
      bottom: 32px;
      left: 15px;
      color: #2e2e2e;
    "
  >
  </q-btn>

  <div
    v-if="showLegend"
    class="shadow-1"
    style="
      position: absolute;
      bottom: 32px;
      left: 60px;
      z-index: 10;
      height: fit-content;
    "
  >
    <Legend />
  </div>

  <q-btn
    :icon="
      ms.leftPanelVis
        ? 'keyboard_double_arrow_left'
        : 'keyboard_double_arrow_right'
    "
    class="bg-white shadow-1 text-weight-thin"
    square
    :ripple="false"
    @click="handlePanelVis()"
    style="
      display: block;
      position: absolute;
      height: 32px;
      width: 32px;
      top: 132px;
      left: 15px;
      color: #2e2e2e;
    "
  ></q-btn>
</template>

<script setup>
import { ref, watch } from "vue";
import Portal from "@arcgis/core/portal/Portal";
import PortalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource";
import Legend from "./UI/Legend.vue";
import { useMapStore } from "../store/index";
const ms = useMapStore();

let mapEl = null;
let view = null;

const showLegend = ref(true);

const toggleLegend = () => {
  showLegend.value = !showLegend.value;
};

// basemap gallery
const allowedBasemapTitles = [
  "TNC Light with Hillshade",
  "TNC Dark Gray Map",
  "Ocean Basemap",
  "Imagery Hybrid",
];
const portal = new Portal();
const source = new PortalBasemapsSource({
  portal,
  query: {
    id: "defa1b2287604d069c70af515331e30f",
  },
  filterFunction: (basemap) =>
    allowedBasemapTitles.indexOf(basemap.portalItem.title) > -1,
});

const handlePanelVis = () => {
  ms.leftPanelVis = !ms.leftPanelVis;
  ms.leftPanelVis ? (ms.splitterModel = 30) : (ms.splitterModel = 0);
  let newWidthEl = document.getElementsByClassName("q-splitter__before");

  if (!ms.leftPanelVis) {
    console.log(newWidthEl[0]);
    newWidthEl[0].style.width = "0%";
  }
};

function getMapPrint() {
  view.takeScreenshot().then((screenshot) => {
    let image = screenshot.dataUrl;
    ms.mapScreenshot = image;

    ms.generatePdf();
    ms.printMap = false;
  });
}

// watch for a new shapefile upload
watch(
  () => ms.zipInput,
  (newVal) => {
    if (!mapEl) return;

    if (newVal) {
      ms.loadShapefile(newVal, mapEl, view);
    } else {
      ms.removeShapefile(mapEl);
    }
  },
);

watch(
  () => ms.printMap,
  () => {
    if (ms.printMap) {
      getMapPrint();
    }
  },
);

// arcgisViewReadyChange
const onReady = (event) => {
  view = document.querySelector("arcgis-map").view;
  mapEl = view.map;
};
</script>

<style>
@media screen and (max-width: 700px) {
  #map {
    width: 100%;
    min-height: 20vh;
  }
  .esri-view-width-xsmall .esri-expand--auto .esri-expand__container--expanded {
    height: fit-content;
  }
}
#map {
  overflow: hidden;
}
.esri-basemap-gallery {
  margin-bottom: 0px !important;
}
</style>
