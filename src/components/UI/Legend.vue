<template>
  <div style="height: fit-content">
    <div class="custom-legend">
      <div class="q-mb-md">
        <div class="text-subtitle1 q-mb-sm">Burn Severity</div>
        <div class="row">
          <div
            class="col-1"
            style="height: 20px; width: 20px; background-color: #a0b955"
          ></div>
          <div class="col q-ml-sm">Closed</div>
        </div>
        <div class="row q-my-sm">
          <div
            style="height: 20px; width: 20px; background-color: #f2e394"
            class="col-1"
          ></div>
          <div class="col q-ml-sm">Open</div>
        </div>
        <div class="row">
          <div
            style="height: 20px; width: 20px; background-color: #f2ae72"
            class="col-1"
          ></div>
          <div class="col q-ml-sm">Early Seral</div>
        </div>
      </div>

      <div class="q-mb-md" v-if="ms.predClass">
        <div class="text-subtitle1 q-mb-sm">Predicted Class</div>
        <div class="row">
          <div
            class="col-1"
            style="height: 20px; width: 20px; background-color: #a0b955"
          ></div>
          <div class="col q-ml-sm">Closed</div>
        </div>
        <div class="row q-my-sm">
          <div
            style="height: 20px; width: 20px; background-color: #f2e394"
            class="col-1"
          ></div>
          <div class="col q-ml-sm">Open</div>
        </div>
        <div class="row">
          <div
            style="height: 20px; width: 20px; background-color: #f2ae72"
            class="col-1"
          ></div>
          <div class="col q-ml-sm">Early Seral</div>
        </div>
      </div>

      <div class="q-mb-md" v-if="ms.pClosed">
        <div class="text-subtitle1 q-mb-sm">P (Closed)</div>
        <div class="row">
          <div
            class="col-1"
            style="
              height: 124px;
              width: 20px;
              background-image: linear-gradient(to top, #a0b955, white);
            "
          ></div>
          <div class="col q-ml-sm">
            <div>0.0</div>
            <div>0.2</div>
            <div>0.4</div>
            <div>0.6</div>
            <div>0.8</div>
            <div>1.0</div>
          </div>
        </div>
      </div>

      <div class="q-mb-md" v-if="ms.pOpen">
        <div class="text-subtitle1 q-mb-sm">P (Open)</div>
        <div class="row">
          <div
            class="col-1"
            style="
              height: 124px;
              width: 20px;
              background-image: linear-gradient(to top, #f2e394, white);
            "
          ></div>
          <div class="col q-ml-sm">
            <div>0.0</div>
            <div>0.2</div>
            <div>0.4</div>
            <div>0.6</div>
            <div>0.8</div>
            <div>1.0</div>
          </div>
        </div>
      </div>

      <div v-if="ms.pEarlySeral">
        <div class="text-subtitle1 q-mb-sm">P (Early Seral)</div>
        <div class="row">
          <div
            class="col-1"
            style="
              height: 124px;
              width: 20px;
              background-image: linear-gradient(to top, #f2ae72, white);
            "
          ></div>
          <div class="col q-ml-sm">
            <div>0.0</div>
            <div>0.2</div>
            <div>0.4</div>
            <div>0.6</div>
            <div>0.8</div>
            <div>1.0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMapStore } from '../../store/index';
const ms = useMapStore();
</script>

<style scoped>
.custom-legend {
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 210px;
}

.legend-div {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
</style>
