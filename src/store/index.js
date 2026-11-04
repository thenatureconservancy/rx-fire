import { defineStore } from "pinia";
import { markRaw } from "vue";
import esriRequest from "@arcgis/core/request";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs =
  pdfFonts.vfs ||
  pdfFonts.default?.vfs ||
  pdfFonts.pdfMake?.vfs ||
  pdfFonts.default ||
  pdfFonts;

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    // MODELS
    splitterModel: 30,
    mobileSplitterModel: 35,
    landscapeInfo: false,
    operatoinalInfo: false,
    aoiInfo: false,
    leftPanelVis: true,
    rightPanelVis: false,
    burnBound: true,
    predClass: false,
    pClosed: false,
    pOpen: false,
    pEarlySeral: false,
    zipInput: null,
    shapefileLayer: null,
    fileName: "Upload Shapefile",
    printMap: false,
    mapScreenshot: null,
    resetSlider: false,

    // FILTER
    filterFactors: [
      {
        label: "Topography",
        type: "landscape",
        factors: [
          {
            label: "Heat load index",
            checked: false,
          },
          {
            label: "Slope angle, aspect",
            checked: false,
          },
          {
            label: "Terrain position",
            checked: false,
          },
        ],
      },
      {
        label: "Forest Structure",
        type: "landscape",
        factors: [
          {
            label: "Canopy closure",
            checked: false,
          },
          {
            label: "Stand density",
            checked: false,
          },
          {
            label: "Fuel model",
            checked: false,
          },
          {
            label: "Ericaceous understory",
            checked: false,
          },
        ],
      },
      {
        label: "Long-term Climatic Conditions",
        type: "landscape",
        factors: [
          {
            label: "30-year Climate Normals",
            checked: false,
          },
        ],
      },
      {
        label: "Day-of-burn Weather",
        type: "operational",
        factors: [
          {
            label: "Temperature",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "Relative humidity",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "Wind speed",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "10-hr fuel moistures",
            min: 0,
            max: 100,
            value: 0,
          },
        ],
      },
      {
        label: "Ignition",
        type: "operational",
        factors: [
          {
            label: "Ignition type",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "Ignition start time",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "Ignition stop time",
            min: 0,
            max: 100,
            value: 0,
          },
        ],
      },
      {
        label: "Operational Resources",
        type: "operational",
        factors: [
          {
            label: "Unit size",
            min: 0,
            max: 100,
            value: 0,
          },
          {
            label: "Personnel",
            min: 0,
            max: 100,
            value: 0,
          },
        ],
      },
    ],
  }),

  // FUNCTIONS
  actions: {
    getLayersInfo() {
      // get and assign layers
      const webMap = document.querySelector("arcgis-map").view.map;
      console.log(webMap);
    },

    async loadShapefile(file, map, view) {
      if (!file || !map || !view) return;

      const formData = new FormData();

      formData.append("filetype", "shapefile");
      formData.append(
        "publishParameters",
        JSON.stringify({
          name: file.name.replace(".zip", ""),
          targetSR: view.spatialReference.toJSON(),
        }),
      );
      formData.append("f", "json");
      formData.append("file", file);

      const response = await esriRequest(
        "https://www.arcgis.com/sharing/rest/content/features/generate",
        {
          method: "post",
          body: formData,
        },
      );

      const fcLayer = response.data.featureCollection.layers[0];
      const layerDef = fcLayer.layerDefinition;

      // The generate endpoint returns Esri enum strings
      // (esriFieldTypeOID, esriGeometryPolygon, ...). The client-side
      // FeatureLayer constructor expects the short JSON forms, so map them.
      const fieldTypeMap = {
        esriFieldTypeOID: "oid",
        esriFieldTypeSmallInteger: "small-integer",
        esriFieldTypeInteger: "integer",
        esriFieldTypeBigInteger: "big-integer",
        esriFieldTypeSingle: "single",
        esriFieldTypeDouble: "double",
        esriFieldTypeString: "string",
        esriFieldTypeDate: "date",
        esriFieldTypeDateOnly: "date-only",
        esriFieldTypeTimeOnly: "time-only",
        esriFieldTypeTimestampOffset: "timestamp-offset",
        esriFieldTypeGUID: "guid",
        esriFieldTypeGlobalID: "global-id",
        esriFieldTypeXML: "xml",
        esriFieldTypeBlob: "blob",
        esriFieldTypeRaster: "raster",
        esriFieldTypeGeometry: "geometry",
      };

      const geometryTypeMap = {
        esriGeometryPoint: "point",
        esriGeometryMultipoint: "multipoint",
        esriGeometryPolyline: "polyline",
        esriGeometryPolygon: "polygon",
        esriGeometryMultiPatch: "multipatch",
      };

      const fields = layerDef.fields.map((f) => ({
        ...f,
        type: fieldTypeMap[f.type] ?? f.type,
      }));

      // Resolve the spatial reference. The generate endpoint does not always
      // echo it back on the feature set, so fall back to the layer's extent
      // and finally to the view's spatial reference (we sent it as targetSR).
      const spatialReference =
        fcLayer.featureSet.spatialReference ??
        layerDef.extent?.spatialReference ??
        view.spatialReference.toJSON();

      const geometryType =
        geometryTypeMap[layerDef.geometryType] ?? layerDef.geometryType;

      // Stamp the spatial reference and geometry type onto each feature so
      // ArcGIS can autocast the geometries and compute the layer's full
      // extent instead of defaulting to WGS84.
      const features = fcLayer.featureSet.features.map((feat) => ({
        ...feat,
        geometry: feat.geometry
          ? { ...feat.geometry, type: geometryType, spatialReference }
          : feat.geometry,
      }));

      // Determine the object id field. Prefer the one already typed "oid";
      // otherwise fall back to the layer definition's objectIdField.
      let objectIdField =
        fields.find((f) => f.type === "oid")?.name ?? layerDef.objectIdField;

      // Ensure exactly one field is typed "oid" and matches objectIdField.
      if (objectIdField) {
        const oidField = fields.find((f) => f.name === objectIdField);
        if (oidField) oidField.type = "oid";
      }

      const layer = new FeatureLayer({
        source: features,
        fields,
        objectIdField,
        geometryType,
        spatialReference,
        title: file.name.replace(".zip", ""),
      });

      // Remove any previously loaded shapefile before adding the new one.
      this.removeShapefile(map);

      map.add(layer);
      // Store the raw layer (not a reactive proxy) so map.remove() can match
      // it by identity later. A proxied layer would never === the instance
      // held in map.layers, so removal would silently fail.
      this.shapefileLayer = markRaw(layer);

      await layer.when();

      if (layer.fullExtent) {
        view.goTo(layer.fullExtent);
      }
    },

    removeShapefile(map) {
      const home = document.querySelector("arcgis-home");
      if (this.shapefileLayer && map) {
        map.remove(this.shapefileLayer);
        home.go();
      }
      this.shapefileLayer = null;
    },

    async generatePdf() {
      let today = new Date();
      let dateString = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      // Define the content of the PDF document
      let docDefinition = {
        header: {
          text: dateString,
          alignment: "right",
          margin: [0, 20, 20, 0],
        },
        footer: function (currentPage, pageCount) {
          return {
            text:
              "Page " + currentPage.toString() + " of " + pageCount.toString(),
            alignment: "center",
            margin: [0, 0, 0, 10],
          };
        },
        content: [
          {
            text: "Management Goals Summary",
            style: ["header1", "centerItem"],
            margin: [0, 0, 0, 20],
          },
          {
            text: [
              "This report was generated using the Rx Fire Decision Support Tool and provides recommended Rx Fire guidance.",
            ],
            style: "header4",
            margin: [0, 0, 0, 20],
          },
          {
            image: this.mapScreenshot,
            width: 425,
            height: 325,
            style: ["centerItem"],
            margin: [0, 0, 0, 20],
          },
          {
            text: ["Report content goes here."],
          },
        ],
        defaultStyle: {
          fontSize: 11,
          color: "#374269",
        },
        styles: {
          header1: {
            bold: true,
            fontSize: 18,
          },
          header1a: {
            bold: true,
            fontSize: 16,
          },
          header2: {
            bold: true,
            fontSize: 14,
          },
          header3: {
            bold: true,
            fontSize: 12,
          },
          header4: {
            fontSize: 12,
          },
          anotherStyle: {
            italics: true,
            alignment: "right",
          },
          boldItem: {
            bold: true,
          },
          centerItem: {
            alignment: "center",
          },
        },
      };

      // Create a PDF document
      pdfMake.createPdf(docDefinition).download("Rx Fire Summary");
    },
  },
});
