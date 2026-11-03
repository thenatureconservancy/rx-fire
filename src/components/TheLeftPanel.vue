<template>
  <div
    class="q-px-sm q-mt-sm q-ml-sm"
    style="
      display: flex;
      flex-direction: column;
      height: calc(100vh - 90px);
      overflow: hidden;
    "
  >
    <q-scroll-area style="flex: 1" class="q-pr-md">
      <div>
        <!-- top -->
        <div>
          <div id="panel-title">
            <div class="text-bold" style="font-size: large">
              Prescribed Fire Outcomes
            </div>
          </div>
          <div class="q-my-md">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium, sit numquam obcaecati sequi iste ex molestias
            laboriosam repellat sunt ratione eum. Suscipit, excepturi amet!
            Maiores qui aperiam quo ratione? Nostrum?
          </div>
        </div>
        <div class="q-mb-md q-mt-sm">
          <div style="display: flex; flex-direction: column">
            <q-checkbox
              dense
              v-model="ms.burnBound"
              toggle-order="tf"
              label="Burn Boundaries"
            />
            <q-checkbox
              dense
              v-model="ms.predClass"
              toggle-order="ft"
              label="Predicted Class"
            />
            <q-checkbox
              dense
              v-model="ms.pClosed"
              toggle-order="ft"
              label="P (Closed)"
            />
            <q-checkbox
              dense
              v-model="ms.pOpen"
              toggle-order="ft"
              label="P (Open)"
            />
            <q-checkbox
              dense
              v-model="ms.pEarlySeral"
              toggle-order="ft"
              label="P (Early Seral)"
            />
          </div>
        </div>
        <!-- factor filters -->
        <div class="q-mb-md">
          <!-- landscape factors -->
          <div class="q-mb-md">
            <div style="display: flex">
              <div class="text-bold">Landscape Factors</div>
              <div class="q-mx-sm" style="line-height: 1">
                <IconButton
                  v-if="!ms.landscapeInfo"
                  type="info"
                  method="show-info"
                  @show-info="ms.landscapeInfo = true"
                />
                <IconButton
                  v-if="ms.landscapeInfo"
                  type="close"
                  method="hide-info"
                  @hide-info="ms.landscapeInfo = false"
                />
              </div>
            </div>
            <div class="q-mx-sm" v-if="ms.landscapeInfo">
              Explore the environmental conditions that influence prescribed
              fire behavior and outcomes. These factors include topography,
              forest structure, and long-term climatic conditions across the
              landscape.
            </div>
            <div v-for="factor in ms.filterFactors" :key="factor">
              <div v-if="factor.type == 'landscape'">
                <q-expansion-item
                  class="q-mt-sm"
                  dense
                  :label="factor.label"
                  header-style="background-color: #d3d3d3"
                >
                  <div v-for="subFactor in factor.factors" :key="subFactor">
                    <div class="row q-ml-md q-my-md">
                      <div class="col-5" style="display: flex">
                        <FactorCheckbox />
                        <div class="col-6 q-ml-md">
                          {{ subFactor.label }}
                        </div>
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </div>
          </div>
          <!-- operational factors -->
          <div>
            <div style="display: flex">
              <div class="text-bold">Operational Factors</div>
              <div class="q-mx-sm" style="line-height: 1">
                <IconButton
                  v-if="!ms.operatoinalInfo"
                  type="info"
                  method="show-info"
                  @show-info="ms.operatoinalInfo = true"
                />
                <IconButton
                  v-if="ms.operatoinalInfo"
                  type="close"
                  method="hide-info"
                  @hide-info="ms.operatoinalInfo = false"
                />
              </div>
            </div>
            <div class="q-mx-sm" v-if="ms.operatoinalInfo">
              Evaluate how planning and implementation decisions may affect
              prescribed fire outcomes. Factors include day-of-burn weather
              conditions, ignition strategies, and available operational
              resources.
            </div>
            <div v-for="factor in ms.filterFactors" :key="factor">
              <div v-if="factor.type == 'operational'">
                <q-expansion-item
                  class="q-mt-sm"
                  dense
                  :label="factor.label"
                  header-style="background-color: #d3d3d3"
                >
                  <div v-for="subFactor in factor.factors" :key="subFactor">
                    <div class="row q-ml-md q-my-md">
                      <div class="col-6">
                        {{ subFactor.label }}
                      </div>
                      <div class="col-5">
                        <FactorSlider
                          :option="subFactor"
                          method="update-slider"
                          @update-slider="updateModelProp"
                        />
                      </div>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </div>
          </div>
        </div>
        <!-- area of interest -->
        <div>
          <div style="display: flex">
            <div class="text-bold">Area of Interest</div>
            <div class="q-mx-sm" style="line-height: 1">
              <IconButton
                v-if="!ms.aoiInfo"
                type="info"
                method="show-info"
                @show-info="ms.aoiInfo = true"
              />
              <IconButton
                v-if="ms.aoiInfo"
                type="close"
                method="hide-info"
                @hide-info="ms.aoiInfo = false"
              />
            </div>
          </div>

          <div class="q-mx-sm" v-if="ms.aoiInfo">
            Upload a <b>zipped shapefile</b> to focus the analysis on a specific
            project area. Results and visualizations will automatically update
            to reflect the selected location.
          </div>
          <div class="q-mt-sm">
            <q-file
              dense
              outlined
              v-model="ms.zipInput"
              :label="ms.fileName"
              clearable
              accept=".zip"
            />
          </div>
        </div>
      </div>
    </q-scroll-area>
    <div
      style="
        background-color: white;
        display: flex;
        gap: 8px;
        padding: 16px 8px 0px 0px;
        flex-shrink: 0;
      "
    >
      <q-btn
        square
        unelevated
        color="primary"
        label="Predict"
        icon="query_stats"
        style="flex: 1"
        @click="ms.rightPanelVis = !ms.rightPanelVis"
      />
      <q-btn
        square
        unelevated
        color="primary"
        label="Reset"
        icon="refresh"
        style="flex: 1"
        @click="ms.rightPanelVis = !ms.rightPanelVis"
      />
    </div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { useMapStore } from "../store/index";
import IconButton from "./UI/IconButton.vue";
import Tooltip from "./UI/Tooltip.vue";
import FactorSlider from "./UI/FactorSlider.vue";
import FactorCheckbox from "./UI/FactorCheckbox.vue";

const ms = useMapStore();

function updateModelProp(option) {
  // const factor = ms.filterFactors.find((f) =>
  //   f.factors.some((subFactor) => subFactor.field === option.field)
  // );
  // if (factor) {
  //   const subFactor = factor.factors.find(
  //     (subFactor) => subFactor.field === option.field
  //   );
  //   if (subFactor) {
  //     subFactor.checkboxModel.value = option.checkboxModel.value;
  //     subFactor.min = option.min;
  //     subFactor.max = option.max;
  //     subFactor.step = option.step;
  //   }
  // }
  console.log(option);
}
</script>

<style scoped>
#panel-title {
  display: flex;
}
</style>
