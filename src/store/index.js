import { defineStore } from 'pinia';

export const useMapStore = defineStore('mapStore', () => ({
  // MODELS
  splitterModel: 25,
  mobileSplitterModel: 35,
  leftPanelInfo: false,
  leftPanelVis: true,
  rightPanelVis: false,
  burnBound: true,
  predClass: false,
  pClosed: false,
  pOpen: false,
  pEarlySeral: false,

  // FILTER
  filterFactors: [
    {
      label: 'Topography',
      type: 'landscape',
      factors: [
        {
          label: 'Heat load index',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Slope angle, aspect',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Terrain position',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
    {
      label: 'Forest Structure',
      type: 'landscape',
      factors: [
        {
          label: 'Canopy closure',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Stand density',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Fuel model',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Ericaceous understory',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
    {
      label: 'Long-term Climatic Conditions',
      type: 'landscape',
      factors: [
        {
          label: '30-year Climate Normals',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
    {
      label: 'Day-of-burn Weather',
      type: 'operational',
      factors: [
        {
          label: 'Temperature',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Relative humidity',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Wind speed',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: '10-hr fuel moistures',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
    {
      label: 'Ignition',
      type: 'operational',
      factors: [
        {
          label: 'Ignition type',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Ignition start time',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Ignition stop time',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
    {
      label: 'Operational Resources',
      type: 'operational',
      factors: [
        {
          label: 'Unit size',
          min: 0,
          max: 100,
          value: 0,
        },
        {
          label: 'Personnel',
          min: 0,
          max: 100,
          value: 0,
        },
      ],
    },
  ],

  // FUNCTIONS
  getLayersInfo() {
    // get and assign layers
    const webMap = document.querySelector('arcgis-map').view.map;
    console.log(webMap);
  },
}));
