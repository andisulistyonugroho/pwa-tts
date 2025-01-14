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
    <v-app-bar flat>
      <template v-slot:prepend>
        <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
      </template>

      <v-app-bar-title>{{ title }}</v-app-bar-title>
    </v-app-bar>
    <v-main style="background-color: #E0FFFF;">
      <slot />
    </v-main>
  </v-app>
</template>