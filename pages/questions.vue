<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})

const { $debounce, $dayjs } = useNuxtApp()

const { getQuestionsByLevel } = useQuestionStore()
const { questions } = storeToRefs(useQuestionStore())
const { AddPoint, DeductPoint, QuizTotalTimeUpdate, ResetQuizesPoint } = usePointStore()
const { totalPoint, userPoint } = storeToRefs(usePointStore())
const { selectedQuiz, quizStartTime, quizEndTime } = storeToRefs(useQuizStore())


const numberOfQuestion = ref(0)
const randomQuestion = ref(questions)
const questionIndex = ref(0)
const answerBox = ref(false)
const answerState = ref(false)
const selectedOpt = ref(0)
const countdown = ref(60)

const randomizeQuestion = (() => {
  if (questions.value.length <= 0) {
    navigateTo('/topics', { replace: true })
    return
  }

  const y = [...questions.value]
  numberOfQuestion.value = y.length
  randomQuestion.value = []
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i)
    if (y[x] && randomQuestion.value) {
      const rand = y[x]
      randomQuestion.value.push(rand)
    }
    y.splice(x, 1)
  }
})

const checkTheAnswer = $debounce((id: number) => {
  selectedOpt.value = id
  const index = theOptions.value.findIndex(obj => obj.id === id && obj.is_correct === true)
  if (index >= 0) {
    AddPoint(questions.value[0].quiz_id)
  } else {
    // DeductPoint(questions.value[0].quiz_id)
  }
  answerState.value = index >= 0
  answerBox.value = true

  checkQuizEndTime()

}, 300, { leading: false, trailing: true })

const nextQuestion = $debounce(async () => {
  if (!selectedQuiz.value) return

  answerBox.value = false
  selectedOpt.value = 0

  if (questionIndex.value < numberOfQuestion.value - 1) {
    questionIndex.value += 1
  } else {
    const nextLevel = questions.value[0].the_level + 1
    if (nextLevel > selectedQuiz.value.num_of_level) {
      navigateTo('/chapterCompleted', { replace: true })
      return
    }

    await getQuestionsByLevel(selectedQuiz.value.id, nextLevel)
    randomizeQuestion()
    questionIndex.value = 0
  }
}, 1000, { leading: true, trailing: false })

const exitQuiz = $debounce(() => {
  ResetQuizesPoint()
  navigateTo('/quiz', { replace: true })
}, 1000, { leading: true, trailing: false })

const checkQuizEndTime = () => {
  if (!selectedQuiz.value) return

  const nextLevel = questions.value[0].the_level + 1
  if (questionIndex.value === numberOfQuestion.value - 1 && nextLevel > selectedQuiz.value.num_of_level) {
    quizEndTime.value = $dayjs()

    QuizTotalTimeUpdate(quizStartTime.value, quizEndTime.value)
  }
}

const question = computed(() => {
  return randomQuestion.value[questionIndex.value]
})

const theOptions = computed(() => {
  const opt = []
  const y = [...question.value.options]
  for (let i = y.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i)
    opt.push(y[x])
    y.splice(x, 1)
  }

  return opt
})

// const randomizeOption = () => {
//   const y = [...question.value.options]
//   for (let i = y.length; i > 0; i--) {
//     const x = Math.floor(Math.random() * i)
//     opt.push(y[x])
//     y.splice(x, 1)
//   }
// }

const repeatQuestion = () => {
  answerBox.value = false
}

randomizeQuestion()
quizStartTime.value = $dayjs()
</script>
<template>
  <v-container v-if="questions.length" fluid class="px-2 h-100 bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-h5 text-center"></v-col>
    </v-row>
    <v-row align-self="start">
      <v-col cols="12" class="text-center text-h5">
        Total Poin: {{ totalPoint }}
      </v-col>
      <v-col cols="12">
        <div class="greenboard pa-5">
          <div class="mt-n13 text-center">
            <CounterDown />
          </div>
          <div class="text-h6 text-center">
            {{ question.question_text }}
          </div>
        </div>
        <div class="pt-1 pb-4 text-center">
          Pertanyaan ke {{ questionIndex + 1 }} dari {{ numberOfQuestion }} (Level {{ question.the_level }})
        </div>
      </v-col>
      <v-col v-for="(row, i) in theOptions" cols="12">
        <div
          :class="`${selectedOpt === row.id ? 'bg-orange' : 'bg-yellow'} pa-2 text-center text-h6 border-thin rounded-xl`"
          @click="checkTheAnswer(row.id)">
          {{ String.fromCharCode(65 + i) }}: {{ row.the_text }}
        </div>
      </v-col>
      {{ userPoint }}
    </v-row>
  </v-container>
  <v-footer v-if="questions.length" color="yellow-lighten-5">
    <v-btn size="large" variant="elevated" color="pink" prepend-icon="i-mdi-exit-run" class="ma-3"
      @click="exitQuiz()">Keluar</v-btn>
    <v-spacer></v-spacer>
    <v-btn disabled size="large" variant="elevated" append-icon="i-mdi-car-emergency" class="ma-3">Bantuan</v-btn>
  </v-footer>

  <AnswerDialog :dialog="answerBox" :answerstate="answerState" @clicknext="nextQuestion()" @repeat="repeatQuestion()" />

</template>