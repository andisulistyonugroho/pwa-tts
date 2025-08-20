<script setup lang="ts">
const props = defineProps({
  topicid: { type: Number, default: 0 },
  chapterid: { type: Number, default: 0 },
  numofquestion: { type: Number, default: 0 },
});

const emit = defineEmits(["closeit"]);
const dialog = defineModel<boolean>("dialog");

const { GetFreeRecordInChapter } = useRankinStore();
const { ranks } = storeToRefs(useRankinStore());

// watch(
//   () => dialog.value,
//   (n, o) => {
//     if (n) {
//       GetFreeRecordInChapter({
//         topic_id: props.topicid,
//         chapter_id: props.chapterid,
//       });
//     }
//   },
// );

const topScorer = computed(() => {
  const scores = ranks.value;
  scores.sort((a, b) => {
    const scoreA =
      (props.numofquestion / (a.total_time ? a.total_time : 100000000000000)) *
      a.total_point;
    const scoreB =
      (props.numofquestion / (b.total_time ? b.total_time : 100000000000000)) *
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
        @click="
          dialog = false;
          emit('closeit');
        "
      >
        tutup
      </v-btn>
    </v-card-actions>
    <div class="text-h5 text-center">Papan Skor</div>
    <div class="text-center">Posisi. Nama. Waktu. Poin</div>
    <div v-for="(row, i) in topScorer" class="ma-1">
      <v-sheet class="rounded-xl pa-3">
        <div class="d-flex justify-space-between">
          <div>#{{ i + 1 }}. {{ row.playername }}</div>
          <div class="d-flex justify-space-between">
            <div class="mr-3">
              {{ toDuration(row.total_time ? row.total_time : 0) }}
              <v-icon size="x-small" icon="i-mdi-timer-outline" />
            </div>
            <div>
              {{ row.total_point }}
              <v-icon size="x-small" icon="i-mdi-star-outline" />
            </div>
          </div>
        </div>
      </v-sheet>
    </div>
  </v-card>
</template>
