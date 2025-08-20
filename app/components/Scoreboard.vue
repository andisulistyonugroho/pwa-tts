<script setup lang="ts">
const props = defineProps({
  topicid: { type: Number, default: 0 },
  chapterid: { type: Number, default: 0 },
});

const emit = defineEmits(["closeit"]);

const { GetFreeRecord, CountQuestionInChapter, CountQuestionInTopic } =
  useRankinStore();
const { ranks, numOfQuestions } = storeToRefs(useRankinStore());

if (props.topicid > 0 && props.chapterid === 0) {
  await CountQuestionInTopic(props.topicid);
} else if (props.topicid > 0 && props.chapterid > 0) {
  await CountQuestionInChapter(props.chapterid);
}

await GetFreeRecord({
  topic_id: props.topicid,
  chapter_id: props.chapterid,
});

const topScorer = computed(() => {
  const scores = ranks.value;
  scores.sort((a, b) => {
    const scoreA =
      (numOfQuestions.value / (a.total_time ? a.total_time : 100000000000000)) *
      a.total_point;
    const scoreB =
      (numOfQuestions.value / (b.total_time ? b.total_time : 100000000000000)) *
      b.total_point;
    return scoreB - scoreA;
  });
  return scores;
});
</script>
<template>
  <v-card color="teal-lighten-3 pb-2">
    <v-card-actions>
      <v-spacer />
      <v-btn
        append-icon="i-mdi-close"
        variant="flat"
        color="white"
        @click="emit('closeit')"
      >
        tutup
      </v-btn>
    </v-card-actions>
    <div class="text-h4 text-center">Papan Skor</div>
    <div class="text-center text-h6">
      #Posisi. Nama
      <v-icon icon="i-mdi-timer-outline" />Durasi
      <v-icon icon="i-mdi-medal" />Poin
    </div>
    <div v-for="(row, i) in topScorer" class="my-1 mx-4">
      <v-sheet class="rounded-lg pa-3">
        <div class="d-flex justify-space-between">
          <div>#{{ i + 1 }}. {{ row.playername }}</div>
          <div class="d-flex justify-space-between">
            <div class="mr-3">
              <v-icon icon="i-mdi-timer-outline" />
              {{ toDuration(row.total_time ? row.total_time : 0) }}
            </div>
            <div>
              <v-icon color="orange-darken-3" icon="i-mdi-medal" />
              {{ row.total_point }}
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
  </v-card>
</template>
