<script setup type="ts">
const props = defineProps({
  dialog: { type: Boolean, default: true },
  answerstate: { type: Boolean, default: false }
})
const emit = defineEmits(['clicknext', 'repeat', 'skip'])
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card :color="props.answerstate ? 'green' : 'red'">
      <v-card-text class="text-center pa-0">
        <v-icon :icon="props.answerstate ? 'i-mdi-check-decagram' : 'i-mdi-alert-decagram'" size="250"
          class="ma-0 pa-0"></v-icon>
      </v-card-text>
      <v-card-actions class="pa-5">
        <div class="w-100">
          <template v-if="!props.answerstate">
            <v-btn prepend-icon="i-mdi-reload" block color="black" variant="flat" size="large" class="mb-2" rounded="xl"
              @click="emit('repeat')">Ulangi</v-btn>
            <v-btn block rounded="xl" variant="flat" size="large" color="white" class="text-red" @click="emit('skip')"
              append-icon="i-mdi-arrow-right">
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