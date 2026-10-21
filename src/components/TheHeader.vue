<template>
  <q-toolbar elevated class="bg-primary text-white">
    <q-toolbar-title style="font-weight: 600">
      <!-- <span class="q-mx-sm"
        ><q-img src="/tnc_logo_white.png" width="150px"
      /></span> -->
      <span class="q-mx-sm">Rx Fire</span>
      <span class="text-weight-light">Decision Support Tool</span>
    </q-toolbar-title>
    <q-btn color="primary" dense unelevated icon="menu">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section
              ><a href="https://www.nature.org/en-us/" target="_blank"
                >The Nature Conservancy</a
              ></q-item-section
            >
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </q-toolbar>
</template>

<script setup></script>
