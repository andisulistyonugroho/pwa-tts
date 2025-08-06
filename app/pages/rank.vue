<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
</script>
<template>
  <v-container fluid class="px-2 h-100 bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-h4 text-center">Ranking</v-col>
      <v-col v-for="i in 10" cols="12" class="bg-red">
        <v-sheet class="rounded-xl pa-3">
          <div class="d-flex justify-space-between">
            <div>#{{ i }}. Nama {{ i }}</div>
            <div class="d-flex justify-space-between">
              <div>100{{ i }} poin</div>
              <div>5 menit 50 detik</div>
            </div>
          </div>

        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>