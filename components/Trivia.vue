<script setup lang="ts">

const { $debounce } = useNuxtApp()
const { questions } = storeToRefs(useQuestionStore())

const baseTime = 25
const countdown = ref(0)
const theInterval = ref()
const questionNumber = ref(0)
const resultDialog = ref(false)
const answerResult = ref(false)
const noAnswerDialog = ref(false)
const numberOfQuestion = ref(0)
const chipGroup = ref(6)

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

randomizeQuestion()
countDon()

watch(resultDialog, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
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

const checkTheAnswer = $debounce((id: number) => {
  resultDialog.value = true
  noAnswerDialog.value = false
  const index = options.value.findIndex(obj => obj.id === id && obj.is_correct === 1)
  if (index < 0) {
    answerResult.value = false
    return
  }
  answerResult.value = true
  clearInterval(theInterval.value)
}, 500, { leading: false, trailing: true })

const nextQuestion = () => {
  chipGroup.value = 6
  questionNumber.value++
  countdown.value = baseTime
  countDon()
}

</script>
<template>
  <v-card class="text-center">
    <v-card-text>
      <div>
        <v-icon icon="mdi-medal" color="black" size="x-large" />
        <span class="text-h5 text-teal mx-3">Poin: 50</span>
        <v-icon icon="mdi-medal" color="red" size="x-large" />
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
            <div>
              {{ chipGroup }} {{ typeof chipGroup }}
              <v-chip-group v-model="chipGroup" column>
                <v-chip v-for="(row, i) in options" variant="outlined" color="teal" class="text-h6 bg-yellow ma-3"
                  size="large" @click="checkTheAnswer(row.id)">
                  {{ String.fromCharCode(65 + i) }}: {{ row.the_text }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn size="large" variant="elevated" color="info" prepend-icon="mdi-exit-run" class="ma-3"
        @click="$emit('closeit')">Keluar</v-btn>
      <v-spacer></v-spacer>
      <v-btn size="large" variant="elevated" color="info" append-icon="mdi-car-emergency" class="ma-3">Bantuan</v-btn>
    </v-card-actions>
  </v-card>
  <v-dialog v-model="resultDialog" max-width="500">
    <v-card class="pa-5" @click="resultDialog = false">
      <v-card-text class="text-center">
        <v-icon :color="`${answerResult ? 'green' : 'red'}`" size="120">
          {{ answerResult ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}
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