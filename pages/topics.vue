<script setup lang="ts">
definePageMeta({
  layout: 'firstlayer'
})

const { $bus } = useNuxtApp()

const { getTopics } = useQuizStore()
const { topics } = storeToRefs(useQuizStore())

$bus.$emit('set-header', 'Topik')
await getTopics()
</script>
<template>
  <v-container>
    <v-row>
      <v-col v-for="row in topics" cols="12">
        <v-sheet rounded="lg" class="px-3 py-4 mb-2">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="11" class="flex-grow-1 flex-shrink-0">
              <v-icon>mdi-bookshelf</v-icon>&nbsp;
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon>mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
