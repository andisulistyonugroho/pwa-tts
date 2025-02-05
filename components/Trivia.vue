<script setup lang="ts">
const { $debounce } = useNuxtApp()
const { openNextLevel } = useQuizStore()
const { questions } = storeToRefs(useQuestionStore())

defineEmits(['closeit'])
const props = defineProps({
  totallevel: { type: Number, default: 0 },
  quizid: { type: Number, default: 0 }
})

const baseTime = 25
const countdown = ref(0)
const theInterval = ref()
const questionNumber = ref(0)
const resultDialog = ref(false)
const answerResult = ref(false)
const noAnswerDialog = ref(false)
const numberOfQuestion = ref(0)
const chipGroup = ref(6)
const allDone = ref(false)
const correctAnswer = ref(0)

type Question = {
  id: number,
  quizid: number,
  question_text: string,
  the_level: number,
  answer: [{
    id: number,
    the_text: string,
    is_correct: number
  }]
}
const randomQuestion = ref<Question[]>([])
countdown.value = baseTime

watch(resultDialog, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    if (numberOfQuestion.value === questionNumber.value + 1) {
      allDone.value = true
      clearInterval(theInterval.value)
      if (correctAnswer.value === numberOfQuestion.value) {
        console.log('quizid:', randomQuestion.value[0].quizid)
        openNextLevel(props.quizid, question.value.the_level + 1)
      }
      return
    }
    nextQuestion()
  }
})

const question = computed(() => {
  return randomQuestion.value[questionNumber.value]
})
const options = computed(() => {
  const opt = []
  const y = [...question.value.answer]
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i)
    opt.push(y[x])
    y.splice(x, 1)
  }
  return opt
})

const countDon = (() => {
  clearInterval(theInterval.value)
  if (countdown.value > 0) {
    theInterval.value = setInterval(() => {
      if (countdown.value <= 0) {
        clearInterval(theInterval.value)
        return
      }
      countdown.value = countdown.value - 1
    }, 1000)
  }
})

const randomizeQuestion = (() => {
  const y = [...questions.value]
  numberOfQuestion.value = y.length
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i)
    randomQuestion.value.push(y[x])
    y.splice(x, 1)
  }
})

const checkTheAnswer = $debounce((id: number) => {
  resultDialog.value = true
  noAnswerDialog.value = false
  const index = options.value.findIndex(obj => obj.id === id && obj.is_correct === 1)
  if (index < 0) {
    answerResult.value = false
    return
  }
  answerResult.value = true
  correctAnswer.value++
  clearInterval(theInterval.value)
}, 500, { leading: false, trailing: true })

const nextQuestion = () => {
  chipGroup.value = 6
  questionNumber.value++
  countdown.value = baseTime
  countDon()
}

randomizeQuestion()
countDon()

</script>
<template>
  <v-card class="text-center">
    <template v-if="!allDone">
      <v-card-text>
        <div>
          <v-icon icon="i-mdi-medal" color="black" size="x-large" />
          <span class="text-h5 text-teal mx-3">Poin: 50</span>
          <v-icon icon="i-mdi-medal" color="red" size="x-large" />
        </div>
        <v-container class="px-0 mt-12">
          <v-row wrap>
            <v-col cols="12">
              <div class="greenboard pa-5">
                <div>
                  <v-avatar size="62" :color="countdown < 11 ? 'pink' : 'black'" style="margin-top:-70px;"
                    class="text-h5">
                    <span :class="`${countdown > 0 && countdown < 11 ? 'blink-me' : ''}`">
                      {{ countdown }}
                    </span>
                  </v-avatar>
                </div>
                <div class="text-h6">
                  {{ question.question_text }}
                </div>
              </div>
              <div class="pt-1 pb-6">
                Pertanyaan ke {{ questionNumber + 1 }} dari {{ numberOfQuestion }}
              </div>
              <v-container class="pa-0 ma-0">
                <v-row>
                  <v-col v-for="(row, i) in options" cols="12">
                    <v-card variant="outlined" class="bg-yellow" @click="checkTheAnswer(row.id)" rounded="xl">
                      <v-card-text class="text-h6">
                        {{ String.fromCharCode(65 + i) }}: {{ row.the_text }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn size="large" variant="elevated" color="info" prepend-icon="i-mdi-exit-run" class="ma-3"
          @click="$emit('closeit')">Keluar</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="!allDone" size="large" variant="elevated" color="info" append-icon="i-mdi-car-emergency"
          class="ma-3">Bantuan</v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-card-text>
        <div class="text-center text-h4 my-6 pt-6">
          Part {{ randomQuestion[0].the_level }} <br>Jumlah jawaban benar
          <div class="text-h1 primary--text py-6 my-6">
            <v-avatar color="primary" size="150">
              <span class="white--text">{{ correctAnswer }}</span>
            </v-avatar>
          </div>
          dari {{ numberOfQuestion }} pertanyaan
        </div>
        <div class="text-h5 pt-4 text-center">
          {{ correctAnswer !== numberOfQuestion ? 'belum ' : '' }}bisa melanjutkan<br>ke {{ totallevel ===
            randomQuestion[0].the_level ? 'chapter' : 'part' }} berikutnya
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn size="large" variant="elevated" color="info" class="ma-3" prepend-icon="i-mdi-reload"
          @click="$emit('closeit')">Ulangi</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="correctAnswer === numberOfQuestion" size="large" variant="elevated" color="info"
          append-icon="i-mdi-arrow-right" class="ma-3" @click="$emit('closeit')">Lanjut</v-btn>
      </v-card-actions>
    </template>
  </v-card>
  <v-dialog v-model="resultDialog" max-width="500">
    <v-card class="pa-5" @click="resultDialog = false">
      <v-card-text class="text-center">
        <v-icon :color="`${answerResult ? 'green' : 'red'}`" size="120">
          {{ answerResult ? 'i-mdi-check-circle-outline' : 'i-mdi-close-circle-outline' }}
        </v-icon>
        <div class="text-h4">
          {{ answerResult ? 'MasyaAllah' : 'Subhanallah' }}
        </div>
        <div class="title">
          {{ answerResult ? 'Jawaban kamu Benar' : 'Belum tepat, coba lagi ya' }}
        </div>
        <div v-show="answerResult" class="title">
          + 1 poin
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="noAnswerDialog">
    NO ANSWER
  </v-dialog>
</template>