<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus } = useNuxtApp()

const { getQuizzes } = useQuizStore()
const { quizzes, topicDetail, isDone } = storeToRefs(useQuizStore())

const isOpen = ((id: number) => {
  return isDone.value.findIndex(obj => obj.quizId === id) >= 0
})

$bus.$emit('set-header', 'Quiz')
await getQuizzes()
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center text-h5">{{ topicDetail.title }}</v-col>
      <v-col v-for="row in quizzes" cols="12" class="pb-0">
        <v-card rounded="lg" class="px-3 py-4">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon :color="`${isOpen(row.id) ? 'teal' : 'pink'}`"
                :icon="`${isOpen(row.id) ? 'mdi-lock-open-variant' : 'mdi-lock'}`" />
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon>mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
