<script setup lang="ts">

const { questions } = storeToRefs(useQuestionStore())

const baseTime = 25
const countdown = ref(0)
const theInterval = ref()
const questionNumber = ref(0)

type Question = {
  id: number,
  quizid: number,
  question_text: string,
  the_level: number
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
  for (let i = questions.value.length; i > 0; i--) {
    const x = Math.floor(Math.random() * i)
    randomQuestion.value.push(y[x])
    y.splice(x, 1)
  }
})

randomizeQuestion()
countDon()

const question = computed(() => {
  return randomQuestion.value[questionNumber.value]
})
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
              Pertanyaan ke x dari n
            </div>
            <div>
              <v-radio-group>
                <v-radio v-for="i in 4" class="bg-yellow rounded-xl py-1 mb-2">
                  <template v-slot:label>
                    <span class="text-black text-left text-h6">{{ String.fromCharCode(64 + i) }}: Satu dua tiga
                      empat
                      lima enam
                      tujuh
                      delapan sembilan
                      sepuluh</span>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
          </v-col>
        </v-row>
      </v-container>
      {{ questions }}
    </v-card-text>
    <v-card-actions>
      <v-btn size="large" variant="elevated" color="info" prepend-icon="mdi-exit-run" class="ma-3"
        @click="$emit('closeit')">Keluar</v-btn>
      <v-spacer></v-spacer>
      <v-btn size="large" variant="elevated" color="info" append-icon="mdi-car-emergency" class="ma-3">Bantuan</v-btn>
    </v-card-actions>
  </v-card>
</template>