<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

const { totalPoint } = storeToRefs(usePointStore());

const doStart = () => {
  totalPoint.value = 0;
  navigateTo("/topics", { replace: true });
};
</script>
<template>
  <v-container fluid class="bg-cyan fill-height">
    <v-row>
      <v-col cols="12" md="8">
        <div class="text-h2 text-center font-weight-bold">Kuis Ramadhan</div>
        <div class="text-h6 text-center">
          Uji pengetahuanmu tentang Islam dan sejarahnya
        </div>
        <v-img src="/logo.svg" max-height="400" contain />
      </v-col>
      <v-col cols="12" md="4">
        <v-btn
          block
          size="x-large"
          variant="flat"
          class="font-weight-bold bg-purple"
          @click="doStart()"
        >
          Soal
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
