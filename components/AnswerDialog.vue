<script setup type="ts">
const props = defineProps({
  dialog: { type: Boolean, default: true },
  answerstate: { type: Boolean, default: false }
})
const emit = defineEmits(['clicknext', 'repeat', 'skip'])
const repeated = ref(false)

watch(props, (n, o) => {
  if (n.answerstate) {
    repeated.value = false
  }
})

const doRepeat = () => {
  repeated.value = true
  emit('repeat')
}
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card>
      <v-card-text class="text-center pa-0">
        <v-icon :icon="props.answerstate ? 'i-mdi-check-decagram' : 'i-mdi-alert-decagram'"
          :color="props.answerstate ? 'green' : 'red'" size="250" class="ma-0 pa-0"></v-icon>
      </v-card-text>
      <v-card-actions class="pa-5">
        <div class="w-100">
          <template v-if="!props.answerstate">
            <v-btn :disabled="repeated" prepend-icon="i-mdi-reload" block :color="repeated ? '' : 'black'"
              variant="flat" size="large" class="mb-2" rounded="xl" @click="doRepeat()">Coba lagi</v-btn>
            <v-btn prepend-icon="i-mdi-timer-plus-outline" block color="pink" variant="flat" rounded="xl" class="mb-2"
              size="large">tambah 25 detik
              (<v-icon icon="i-mdi-star" size="x-small" />)</v-btn>
            <v-btn prepend-icon="i-mdi-content-cut" block color="purple" variant="flat" rounded="xl" class="mb-2"
              size="large">50:50
              (<v-icon icon="i-mdi-star" size="x-small" /><v-icon icon="i-mdi-star" size="x-small" />)</v-btn>
            <v-btn block rounded="xl" variant="flat" size="large" color="white" class="text-red"
              @click="repeated = false; emit('skip')" append-icon="i-mdi-arrow-right">
              Skip
            </v-btn>
          </template>
          <template v-else>
            <v-btn block rounded="xl" variant="flat" size="large" color="white" class="text-green"
              @click="emit('clicknext')" append-icon="i-mdi-arrow-right">
              Lanjutkan
            </v-btn>
          </template>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>