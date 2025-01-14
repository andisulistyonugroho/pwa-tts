<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>
<template>
  <v-container fluid class="bg-cyan fill-height">
    <v-row>
      <v-col cols="12" md="8">
        <div class="text-h2 text-center">
          Teka Teki Siroh
        </div>
        <div class="text-h6 text-center">
          Diulang biar ga lupa
        </div>
        <v-img src="/logo.svg" max-height="400" contain />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn block size="x-large" variant="flat" color="purple darken-1 white--text" to="/topics">
          Topik
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>