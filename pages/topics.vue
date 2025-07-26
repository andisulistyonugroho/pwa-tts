<script setup lang="ts">
definePageMeta({
  layout: 'empty'
})

const { $bus, $debounce } = useNuxtApp()

const { getTopics } = useQuizStore()
const { topics, topicDetail } = storeToRefs(useQuizStore())

const openTopic = $debounce((input: {
  id: number;
  title: string
}) => {
  try {
    topicDetail.value = { id: input.id, title: input.title }
    navigateTo('/quiz')
  } catch (error) {
    alert(error)
  }
}, 1000, { leading: true, trailing: false })

$bus.$emit('set-header', 'Topik')
getTopics()
</script>
<template>
  <v-container fluid class="bg-yellow-lighten-5 h-100">
    <v-row>
      <v-col cols="12" class="text-h6">Topik</v-col>
    </v-row>
    <v-row>
      <v-col v-for="row in topics" cols="12">
        <v-card rounded="lg" class="px-3 py-4 mb-2" color="grey-darken-2" @click="openTopic(row)">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="11" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
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
