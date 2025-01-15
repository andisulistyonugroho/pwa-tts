<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus } = useNuxtApp()

const { quizDetail, isDone } = storeToRefs(useQuizStore())

$bus.$emit('set-header', 'Level')

const levelisOpen = computed(() => {
  const theQuestions = isDone.value.find(obj => obj.quizId === quizDetail.value.id)
  return theQuestions?.questionLevel
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center text-h5">{{ quizDetail.title }}</v-col>
      <v-col v-for="(level) in quizDetail.num_of_level" cols="4">
        <v-card rounded="lg" class="text-center">
          <v-card-text>
            <v-avatar :color="`${levelisOpen?.includes(level) ? 'teal' : 'pink'}`"
              :icon="`${levelisOpen?.includes(level) ? 'mdi-lock-open-variant' : 'mdi-lock'}`"></v-avatar>
            <div class="mt-3">Part {{ level }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
