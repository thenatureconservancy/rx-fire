<template>
  <div
    class="q-px-sm q-mt-sm"
    style="
      display: flex;
      flex-direction: column;
      height: calc(100vh - 90px);
      overflow: hidden;
    "
  >
    <q-scroll-area style="flex: 1">
      <div style="padding-right: 12px">
        <div id="panel-title">
          <div style="font-size: large">Prescribed Fire Outcomes</div>
          <div class="q-mx-sm">
            <IconButton
              v-if="!ms.leftPanelInfo"
              type="info"
              method="show-info"
              @show-info="ms.leftPanelInfo = true"
            />
            <IconButton
              v-if="ms.leftPanelInfo"
              type="close"
              method="hide-info"
              @hide-info="ms.leftPanelInfo = false"
            />
          </div>
        </div>
        <div class="q-ma-sm" v-if="ms.leftPanelInfo">
          Extra panel info content
        </div>
        <div class="q-my-md">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium,
          sit numquam obcaecati sequi iste ex molestias laboriosam repellat sunt
          ratione eum. Suscipit, excepturi amet! Maiores qui aperiam quo
          ratione? Nostrum?
        </div>
        <div class="q-mb-md q-mt-sm">
          <!-- <div>Layers</div> -->
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
        <div>
          <div>Landscape Factors</div>
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
          <br />
          <div>Operational Factors</div>
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
    </q-scroll-area>
    <div
      style="
        background-color: white;
        display: flex;
        gap: 8px;
        padding: 8px 8px 8px 0px;
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
import { useMapStore } from '../store/index';
import IconButton from './UI/IconButton.vue';
import Tooltip from './UI/Tooltip.vue';
import FactorSlider from './UI/FactorSlider.vue';

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
