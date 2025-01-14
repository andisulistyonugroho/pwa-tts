<script setup lang="ts">
const { $bus } = useNuxtApp()
const title = ref('TOPIK')

onBeforeMount(() => {
  $bus.$on('set-header', (val: any) => {
    title.value = val
  })
})
onBeforeUnmount(() => {
  $bus.$off('set-header')
})
</script>

<template>
  <NuxtPwaManifest />
  <v-app>
    <v-app-bar flat class="bg-cyan-lighten-4">
      <template v-slot:prepend>
        <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
      </template>

      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    <v-main class="bg-cyan-lighten-4">
      <slot />
    </v-main>
  </v-app>
</template>