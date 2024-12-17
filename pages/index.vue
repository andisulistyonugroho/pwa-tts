<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>
<template>
  <v-container fluid class="bg-cyan lighten-5">
    <v-row style="height:100vh;" align="center" justify="center">
      <v-col cols="12" md="8">
        <div class="text-h2 text-center">
          Teka Teki Siroh
        </div>
        <div class="text-center">
          jelajahi sejarah temukan hikmah
        </div>
        <v-img src="/logo.svg" max-height="300" contain />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn block size="x-large" variant="flat" color="primary" @click="setMode('materi')" class="mb-2">
          Materi
        </v-btn>
        <v-btn block size="x-large" variant="flat" color="purple darken-1 white--text" @click="setMode('quiz')">
          Quiz
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>