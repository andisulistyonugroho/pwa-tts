<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus, $debounce } = useNuxtApp()

const { getQuizzes } = useQuizStore()
const { quizzes, topicDetail, selectedQuiz } = storeToRefs(useQuizStore())
const { InitializePointForTopic } = usePointStore()
const { userPoint } = storeToRefs(usePointStore())
const { getQuestionsByLevel } = useQuestionStore()

const quizIsOpen = ((id: number) => {
  const topic = userPoint.value?.find(obj => obj.topic_id === topicDetail.value.id)
  if (topic) {
    const found = topic.quiz_point.findIndex(obj => obj.quiz_id === id)
    return found >= 0
  }
  return false
})

const openQuiz = $debounce(async (quiz: Quiz) => {
  try {
    selectedQuiz.value = quiz
    await getQuestionsByLevel(quiz.id, 1)
    navigateTo('/questions', { replace: true })
  } catch (error) {
    alert(error)
  }
}, 1000, { leading: true, trailing: false })

$bus.$emit('set-header', 'Chapter')

if (topicDetail.value.id === 0) {
  navigateTo('/topics', { replace: true })
}

await getQuizzes()
InitializePointForTopic({
  topic_id: topicDetail.value.id,
  topic_title: topicDetail.value.title,
  quizzes: quizzes.value
})
</script>
<template>
  <v-container fluid class="bg-yellow-lighten-5 h-100">
    <v-row>
      <v-col cols="12" class="text-center text-h5">{{ topicDetail.title }}</v-col>
      <v-col v-if="quizzes" v-for="row in quizzes" cols="12" class="pb-0">
        <v-card v-if="quizIsOpen(row.id)" rounded="lg" class="px-3 py-4 bg-yellow" @click="openQuiz(row)">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon color="teal" icon="i-mdi-lock-open-variant" />
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon size="large" class="i-mdi:chevron-right">mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
        </v-card>
        <v-card v-else rounded="lg" class="px-3 py-4 bg-grey-darken-1">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon color="pink-lighten-3" icon="i-mdi-lock" />
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon size="large" class="i-mdi:chevron-right">mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
