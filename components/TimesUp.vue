<script setup type="ts">
const props = defineProps({
  dialog: { type: Boolean, default: true }
})
const emit = defineEmits(['skip', 'repeat'])
const { DeductPoint } = usePointStore()
const { userPoint, totalPoint } = storeToRefs(usePointStore())
const { selectedQuiz } = storeToRefs(useQuizStore())
const loading = ref(false)

const doRepeat = () => {
  loading.value = true
  if (totalPoint.value <= 0) {
    alert('tidak cukup poin')
    loading.value = false
    return
  }
  const poin2deduct = 1
  DeductPoint(selectedQuiz.value.id, poin2deduct)

  loading.value = false
  emit('repeat')
}
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card color="red">
      <v-card-text class="text-center pa-0">
        <div class="text-h4 mt-5">Habis waktu</div>
        <v-icon icon="i-mdi-timer-cancel-outline" size="250" class="ma-0 pa-0"></v-icon>
      </v-card-text>
      <v-card-actions class="pa-5">
        <div class="w-100">
          <v-btn prepend-icon="i-mdi-reload" block color="black" variant="flat" size="large" class="mb-2" rounded="xl"
            @click="doRepeat()" :loading="loading">Ulangi (<v-icon icon="i-mdi-star" size="x-small" />)</v-btn>
          <v-btn block rounded="xl" variant="flat" size="large" color="white" class="text-red" @click="emit('skip')"
            append-icon="i-mdi-arrow-right" :loading="loading">
            Skip
          </v-btn>
          {{ userPoint }}
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>