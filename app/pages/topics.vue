<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

const { $bus } = useNuxtApp();

const { getTopics } = useChapterStore();
const { topics } = storeToRefs(useChapterStore());

$bus.$emit("set-header", "Topik");
getTopics();
</script>
<template>
  <v-container fluid class="bg-yellow-lighten-5 h-100">
    <v-row>
      <v-col cols="12" class="text-h6">Pilih Topik</v-col>
    </v-row>
    <v-row>
      <v-col v-for="row in topics" cols="12">
        <v-card
          rounded="lg"
          class="px-3 py-4 mb-2"
          color="grey-darken-2"
          :to="`/chapter?topicid=${row.id}`"
        >
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="11" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon size="large" class="i-mdi:chevron-right"
                >mdi-chevron-right</v-icon
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
