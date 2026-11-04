<template>
  <div
    :class="'sliderDiv-' + this.option.field"
    :id="'sliderDiv-' + this.option.field"
    :ref="'sliderDiv-' + this.option.field"
  ></div>
</template>

<script>
import { markRaw, watch } from "vue";
import Slider from "@arcgis/core/widgets/Slider";
import { useMapStore } from "../../store/index";

export default {
  data() {
    return {
      slider: null,
      sliderDisable: null,
    };
  },
  props: ["method", "option"],
  emits: ["update-slider"],
  computed: {
    resetSlider: {
      get() {
        const store = useMapStore();
        return store.resetSlider;
      },
      set(value) {
        const store = useMapStore();
        store.resetSlider = value;
      },
    },
  },
  watch: {
    resetSlider() {
      if (this.slider) {
        this.slider.values = [0];

        const thumbEl = this.slider.container.querySelector(
          ".esri-slider__thumb",
        );
        const labelEl = thumbEl?.querySelector(".slider-thumb-label");

        if (labelEl) {
          labelEl.textContent = "0";
        }
      }
    },
  },
  mounted() {
    this.slider = markRaw(
      new Slider({
        container: this.$refs["sliderDiv-" + this.option.field],
        id: this.option.field,
        min: this.option.min,
        max: this.option.max,
        values: [this.option.value],
        visibleElements: {
          labels: false,
          rangeLabels: false,
        },
        steps: this.option.step,
        draggableSegmentsEnabled: true,
        disabled: false,
        thumbCreatedFunction: (index, value, thumbElement) => {
          const label = document.createElement("span");
          label.className = "slider-thumb-label";
          label.textContent = Math.round(value);
          thumbElement.appendChild(label);
        },
      }),
    );
    this.slider.on("thumb-drag", () => {
      let val = this.slider.values;
      const thumbEl = this.slider.container.querySelector(
        ".esri-slider__thumb",
      );
      const labelEl = thumbEl?.querySelector(".slider-thumb-label");
      if (labelEl) labelEl.textContent = Math.round(val[0]);
      this.$emit("update-slider", this.option, val);

      // console.log(val);
    });
  },
};
</script>

<style>
.esri-slider {
  z-index: 9999;
}
.esri-slider__thumb {
  background-color: white !important;
  border: solid 2px #386a58;
  width: 26px !important;
  height: 24px !important;
  margin-top: -4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
.slider-thumb-label {
  font-size: 12px;
  color: #333;
  pointer-events: none;
  user-select: none;
  line-height: 1;
}
</style>
