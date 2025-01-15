<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus, $debounce } = useNuxtApp()

const { getTopics, getQuizById } = useQuizStore()
const { topics, topicDetail } = storeToRefs(useQuizStore())

$bus.$emit('set-header', 'Topik')
await getTopics()

const openQuiz = $debounce(async (input: {
  id: number;
  title: string
}) => {
  try {
    topicDetail.value = { id: input.id, title: input.title }
    await navigateTo('/quiz')
  } catch (error) {
    alert(error)
  }
}, 1000, { leading: true, trailing: false })
</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="row in topics" cols="12">
        <v-card rounded="lg" class="px-3 py-4 mb-2" @click="openQuiz(row)">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="11" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
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
