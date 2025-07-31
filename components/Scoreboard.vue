<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, default: false },
  topicid: { type: Number, default: 0 },
  quizid: { type: Number, default: 0 }
})

const emit = defineEmits(['closeit'])

const { GetFreeRecordInQuiz } = useRankinStore()
const { ranks } = storeToRefs(useRankinStore())

watch(() => props.dialog, (n, o) => {
  if (n) {
    GetFreeRecordInQuiz({ topic_id: props.topicid, quiz_id: props.quizid })
  }
})

const topScorer = computed(() => {
  const scores = ranks.value
  scores.sort((a, b) => {
    const scoreA = (60 / (a.total_time ? a.total_time : 100000000000000)) * a.total_point
    const scoreB = (60 / (b.total_time ? b.total_time : 100000000000000)) * b.total_point
    return scoreB - scoreA
  })
  return scores
})
</script>
<template>
  <v-dialog v-model="props.dialog" persistent max-width="300">
    <v-card color="teal-lighten-3">
      <v-card-actions>
        <v-btn append-icon="i-mdi-close" variant="tonal" @click="emit('closeit')">tutup</v-btn>
      </v-card-actions>
      <div class="text-h5 text-center">Papan Skor</div>
      <div class="text-center">Posisi. Nama. Poin. Durasi</div>
      {{ ranks }}
      ===========
      {{ topScorer }}
      <div v-for="i in 10" class="ma-1">
        <v-sheet class="rounded-xl pa-3">
          <div class="d-flex justify-space-between">
            <div>#{{ i }}. Nama {{ i }}</div>
            <div class="d-flex justify-space-between">
              <div>100{{ i }} <v-icon size="x-small" icon="i-mdi-star-outline" /></div>
              <div class="ml-1">5:50 <v-icon size="x-small" icon="i-mdi-timer-outline" /></div>
            </div>
          </div>
        </v-sheet>
      </div>
    </v-card>
  </v-dialog>
</template>