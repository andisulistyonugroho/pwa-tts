<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus, $debounce } = useNuxtApp()
const { quizDetail, isDone } = storeToRefs(useQuizStore())
const { getQuestionsByLevel } = useQuestionStore()

const dialog = ref(false)
const currentLevel = ref(1)

$bus.$emit('set-header', 'Level')

const levelisOpen = computed(() => {
  const theQuestions = isDone.value.find(obj => obj.quizId === quizDetail.value.id)
  return theQuestions?.questionLevel
})

const openQuestion = $debounce(async (level: number) => {
  const foundquiz = isDone.value.find(obj => obj.quizId === quizDetail.value.id)
  if (foundquiz && foundquiz.questionLevel.includes(level)) {
    await getQuestionsByLevel({ quizId: quizDetail.value.id, level: level })
    currentLevel.value = level
    dialog.value = true
  } else {
    alert('Belum bisa diakses')
  }
}, 1000, { leading: true, trailing: false })
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center text-h5">{{ quizDetail.title }}</v-col>
      <v-col v-for="(level) in quizDetail.num_of_level" cols="6" md="2">
        <v-card rounded="lg" class="text-center bg-yellow" @click="openQuestion(level)">
          <v-card-text>
            <v-avatar :color="`${levelisOpen?.includes(level) ? 'teal' : 'pink'}`"
              :icon="`${levelisOpen?.includes(level) ? 'mdi-lock-open-variant' : 'mdi-lock'}`"></v-avatar>
            <div class="mt-3">Part {{ level }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" fullscreen>
    <LazyTrivia v-if="dialog" :totallevel="quizDetail.num_of_level" :quizid="quizDetail.id" @closeit="dialog = false" />
  </v-dialog>
</template>
