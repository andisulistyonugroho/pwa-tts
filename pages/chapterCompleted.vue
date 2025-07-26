<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
const { $dayjs, $debounce } = useNuxtApp()

const { ResetQuizesPoint, NewQuizPoint } = usePointStore()
const { getQuestionsByLevel } = useQuestionStore()
const { userPoint } = storeToRefs(usePointStore())
const { selectedQuiz, topicDetail } = storeToRefs(useQuizStore())

if (!selectedQuiz.value) {
  navigateTo('/topics', { replace: true })
}

const topic = computed(() => {
  const found = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
  return found
})

const result = computed(() => {
  const point = topic.value?.quiz_point.find(obj => obj.quiz_id === selectedQuiz.value?.id)

  if (!point) {
    return
  }

  return point
})

const wrongAnswer = computed(() => {
  if (result.value) {
    return result.value.num_of_question - result.value.correct_answer
  }
  return 0
})

const duration = computed(() => {
  if (result.value) {
    const theDuration = $dayjs.duration(result.value.total_time)
    return theDuration.minutes() + ' menit ' + theDuration.seconds() + ' detik'
  }
  return 0
})

const getOut = $debounce(() => {
  ResetQuizesPoint()
  navigateTo('/quiz', { replace: true })
})

const doRepeat = $debounce(async () => {
  ResetQuizesPoint()
  if (selectedQuiz.value) {
    await getQuestionsByLevel(selectedQuiz.value.id, 1)
  }
  navigateTo('/questions', { replace: true })
}, 1000, { leading: true, trailing: false })

const doNextChapter = $debounce(() => {
  NewQuizPoint()
  navigateTo('/quiz', { replace: true })
}, 1000, { leading: true, trailing: false })
</script>
<template>
  <v-container fluid class="px-2 fill-height bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h3">{{ topic?.topic_title }}</div>
        <div class="text-h5">{{ selectedQuiz?.title }}</div>
        <div class="mt-10 text-h2">
          <v-avatar color="info" size="100">
            {{ result?.total_point }}
          </v-avatar>
        </div>
        <div class="text-h5 mb-10">Poin</div>
        <div class="text-h6">Durasi: {{ duration }}</div>
        <div class="text-h6">Jumlah Soal: {{ result?.num_of_question }}</div>
        <div>
          <span class="text-h6 text-green-darken-2 mx-3">Benar: {{ result?.correct_answer }}</span>
          <span class="text-h6 text-error mx-3">Salah {{ wrongAnswer }}</span>
        </div>
        <div class="mt-12">
          <template v-if="result?.correct_answer === result?.num_of_question">
            <v-btn size="x-large" class="text-h4" append-icon="i-mdi-chevron-double-right"
              @click="doNextChapter()">Lanjut</v-btn>
          </template>
          <template v-else>
            <v-btn size="x-large" class="text-h4" prepend-icon="i-mdi-chevron-double-left"
              @click="getOut()">Keluar</v-btn>
            <v-btn size="x-large" class="text-h4" prepend-icon="i-mdi-reload" @click="doRepeat()">Coba
              lagi</v-btn>
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>