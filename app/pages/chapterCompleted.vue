<script setup lang="ts">
definePageMeta({
  layout: "empty",
});
const { $debounce } = useNuxtApp();

const { ResetChapterPoint, NewChapterPoint } = usePointStore();
const { getQuestionsByLevel } = useQuestionStore();
const { userPoint } = storeToRefs(usePointStore());
const { chapter, topicDetail } = storeToRefs(useChapterStore());
const { FreeSaveRecord } = useRankinStore();

const playername = ref("");
const scoreboardDialog = ref(false);
const form = ref();

if (!chapter.value) {
  navigateTo("/topics", { replace: true });
}

const topic = computed<UserPoint>(() => {
  const found = userPoint.value.find(
    (obj) => obj.topic_id === topicDetail.value.id,
  );
  return found ? found : { topic_id: 0, topic_title: "", chapter_point: [] };
});

const result = computed(() => {
  const point = topic.value?.chapter_point.find(
    (obj) => obj.chapter_id === chapter.value?.id,
  );

  if (!point) {
    return;
  }

  return point;
});

const wrongAnswer = computed(() => {
  if (result.value) {
    return result.value.num_of_question - result.value.correct_answer;
  }
  return 0;
});

const getOut = $debounce(
  () => {
    ResetChapterPoint();
    navigateTo("/topics", { replace: true });
  },
  1000,
  { leading: true, trailing: false },
);

const doRepeat = $debounce(
  async () => {
    ResetChapterPoint();
    if (chapter.value) {
      await getQuestionsByLevel(chapter.value.id, 1);
    }
    navigateTo(`/questions?chapterid=${chapter.value?.id}`, { replace: true });
  },
  1000,
  { leading: true, trailing: false },
);

const doNextChapter = () => {
  NewChapterPoint();
  navigateTo(`/chapter?topicid=${topic.value.topic_id}`, { replace: true });
};

const beforeContinue = $debounce(
  async () => {
    const validate = await form.value.validate();
    if (!validate.valid) return false;

    const input: Rank = {
      playername: playername.value,
      topic_id: topic.value ? topic.value.topic_id : 0,
      chapter_id: chapter.value ? chapter.value.id : 0,
      total_point: result.value ? result.value.total_point : 0,
      total_time: result.value ? result.value.total_time : 0,
    };
    await FreeSaveRecord(input);
    scoreboardDialog.value = true;
  },
  1000,
  { leading: true, trailing: false },
);

const closeScoreBoard = () => {
  scoreboardDialog.value = false;
  doNextChapter();
};
</script>
<template>
  <v-container fluid class="px-2 fill-height bg-yellow-lighten-5">
    <v-row>
      <v-col cols="12" class="text-center">
        <div class="text-h3">Poin Kamu</div>
        <div class="my-10 text-h1">
          <v-avatar color="info" size="150">
            {{ result?.total_point }}
          </v-avatar>
        </div>
        <div class="text-h4">{{ topic?.topic_title }}</div>
        <div class="text-h5">#{{ chapter?.title }}</div>
        <div class="text-h6">
          Durasi: {{ toDuration(result ? result.total_time : 0) }}
        </div>
        <div class="text-h6">Jumlah Soal: {{ result?.num_of_question }}</div>
        <div>
          <span class="text-h6 text-green-darken-2 mx-3"
            >Benar: {{ result?.correct_answer }}</span
          >
          <span class="text-h6 text-error mx-3">Salah {{ wrongAnswer }}</span>
        </div>
        <div class="mt-12">
          <template
            v-if="
              result &&
              result.num_of_question > 0 &&
              result?.correct_answer === result?.num_of_question
            "
          >
            <div class="px-12">
              <v-form ref="form">
                <v-text-field
                  v-model="playername"
                  label="Nama Kamu"
                  variant="outlined"
                  placeholder="Masukkan nama kamu"
                  persistent-placeholder
                  class="bg-white"
                  :rules="[(v: any) => !!v || 'Harus diisi']"
                />
              </v-form>
            </div>
            <v-btn
              block
              size="x-large"
              class="text-h4 mb-4"
              color="teal"
              prepend-icon="i-mdi-content-save"
              @click="beforeContinue()"
              >Simpan</v-btn
            >
            <v-btn
              block
              size="x-large"
              class="text-h4"
              color="purple"
              prepend-icon="i-mdi-reload"
              @click="doRepeat()"
              >Coba lagi</v-btn
            >
            <v-btn
              block
              size="x-large"
              class="text-h4 mt-3"
              color="pink"
              append-icon="i-mdi-chevron-double-right"
              @click="doRepeat()"
              >Skip</v-btn
            >
          </template>
          <template v-else>
            <v-btn
              block
              size="x-large"
              class="text-h4 mb-4"
              prepend-icon="i-mdi-exit-run"
              color="pink"
              @click="getOut()"
              >Keluar</v-btn
            >
            <v-btn
              block
              size="x-large"
              class="text-h4"
              color="purple"
              prepend-icon="i-mdi-reload"
              @click="doRepeat()"
              >Coba lagi</v-btn
            >
          </template>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="scoreboardDialog">
    <LazyScoreboard
      :topicid="topic?.topic_id"
      :chapterid="result?.chapter_id"
      @closeit="closeScoreBoard()"
    />
  </v-dialog>
</template>
