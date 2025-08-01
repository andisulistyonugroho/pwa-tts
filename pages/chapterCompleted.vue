<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})
const { $debounce } = useNuxtApp()

const { ResetQuizesPoint, NewQuizPoint } = usePointStore()
const { getQuestionsByLevel } = useQuestionStore()
const { userPoint } = storeToRefs(usePointStore())
const { selectedQuiz, topicDetail } = storeToRefs(useQuizStore())
const { FreeSaveRecord } = useRankinStore()

const playername = ref('')
const scoreboardDialog = ref(false)
const form = ref()

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

const getOut = $debounce(() => {
  ResetQuizesPoint()
  navigateTo('/quiz', { replace: true })
}, 1000, { leading: true, trailing: false })

const doRepeat = $debounce(async () => {
  ResetQuizesPoint()
  if (selectedQuiz.value) {
    await getQuestionsByLevel(selectedQuiz.value.id, 1)
  }
  navigateTo('/questions', { replace: true })
}, 1000, { leading: true, trailing: false })

const doNextChapter = () => {
  NewQuizPoint()
  navigateTo('/quiz', { replace: true })
}

const beforeContinue = $debounce(async () => {
  const validate = await form.value.validate()
  if (!validate.valid) return false

  const input: Rank = {
    playername: playername.value,
    topic_id: topic.value ? topic.value.topic_id : 0,
    quiz_id: selectedQuiz.value ? selectedQuiz.value.id : 0,
    total_point: result.value ? result.value.total_point : 0,
  }
  await FreeSaveRecord(input)
  scoreboardDialog.value = true
}, 1000, { leading: true, trailing: false })

const closeScoreBoard = () => {
  scoreboardDialog.value = false
  doNextChapter()
}

</script>
<template>
  <v-container fluid class="px-2 fill-height bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h3">
          Poin Kamu
        </div>
        <div class="my-10 text-h1">
          <v-avatar color="info" size="150">
            {{ result?.total_point }}
          </v-avatar>
        </div>
        <div class="text-h4">{{ topic?.topic_title }}</div>
        <div class="text-h5">#{{ selectedQuiz?.title }}</div>
        <div class="text-h6">Durasi: {{ toDuration(result ? result.total_time : 0) }}</div>
        <div class="text-h6">Jumlah Soal: {{ result?.num_of_question }}</div>
        <div>
          <span class="text-h6 text-green-darken-2 mx-3">Benar: {{ result?.correct_answer }}</span>
          <span class="text-h6 text-error mx-3">Salah {{ wrongAnswer }}</span>
        </div>
        <div class="mt-12">
          <template v-if="result && result.num_of_question > 0 && result?.correct_answer === result?.num_of_question">
            <div class="px-12">
              <v-form ref="form">
                <v-text-field v-model="playername" label="Nama Kamu"
                  :rules="[(v: any) => !!v || 'Harus diisi']"></v-text-field>
              </v-form>
            </div>
            <v-btn size="x-large" class="text-h4" append-icon="i-mdi-content-save"
              @click="beforeContinue()">Simpan</v-btn>
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
  <LazyScoreboard :dialog="scoreboardDialog" :topicid="topic?.topic_id" :quizid="result?.quiz_id"
    @closeit="closeScoreBoard()" />
</template>