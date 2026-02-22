<script setup lang="ts">
definePageMeta({
  layout: "firstlayer",
});

const { $bus, $debounce } = useNuxtApp();
const route = useRoute();

const { getChapters, getTopicDetail } = useChapterStore();
const { chapter, topicDetail, chapters } = storeToRefs(useChapterStore());
const { InitializePointForTopic } = usePointStore();
const { userPoint } = storeToRefs(usePointStore());
const { getQuestionsByLevel } = useQuestionStore();
const { chapterOpened } = storeToRefs(useRankinStore());
const queryTopicId = route.query.topicid;

const dialog = ref(false);
const sheetScoreboard = ref(false);

let topicId = 0;
if (typeof queryTopicId === "string") {
  topicId = parseInt(queryTopicId);
}

const chapterIsOpen = (id: number) => {
  return chapterOpened.value.includes(id);
};

const openChapters = $debounce(
  async (ch: Chapter) => {
    try {
      chapter.value = ch;
      await getQuestionsByLevel(ch.id, 1);
      navigateTo(`/questions?chapterid=${ch.id}`, { replace: true });
    } catch (error) {
      alert(error);
    }
  },
  1000,
  { leading: true, trailing: false },
);

const openScoreboard = $debounce(
  async (ch: Chapter) => {
    try {
      chapter.value = ch;
      sheetScoreboard.value = true;
    } catch (error) {
      alert(error);
    }
  },
  1000,
  { leading: true, trailing: false },
);

const start1stChapters = async () => {
  dialog.value = false;
  const firstChapter = chapters.value[0];
  if (firstChapter) {
    await getQuestionsByLevel(firstChapter.id, 1);
    navigateTo(`/questions?chapterid=${firstChapter.id}`);
  }
};

const chapterNonAccsessible = () => {
  alert(
    "Chapter ini akan terbuka jika semua pertanyaan di chapter sebelumnya terjawab dengan benar semua",
  );
};

$bus.$emit("set-header", "Chapter");

await getTopicDetail(topicId);
if (!topicDetail.value.id) {
  navigateTo("/topics", { replace: true });
}

await getChapters(topicId);

if (userPoint.value.length === 0) {
  dialog.value = true;
  InitializePointForTopic({
    topic_id: topicDetail.value.id,
    topic_title: topicDetail.value.title,
    chapters: chapters.value,
  });
}
</script>
<template>
  <v-container fluid class="bg-yellow-lighten-5 h-100">
    <v-row>
      <v-col cols="12" class="text-center text-h5">{{
        topicDetail.title
      }}</v-col>
      <v-col v-if="chapters" v-for="row in chapters" cols="12" class="pb-0">
        <v-card
          v-if="chapterIsOpen(row.id)"
          rounded="lg"
          class="px-3 py-4 bg-yellow"
        >
          <v-row no-gutters>
            <v-col cols="12" md="10" class="text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="6" md="1" class="pr-1">
              <v-btn
                class="text-none"
                block
                color="red"
                prepend-icon="i-mdi-trophy-variant-outline"
                @click="openScoreboard(row)"
              >
                Top Skor</v-btn
              >
            </v-col>
            <v-col cols="6" md="1">
              <v-btn
                class="pa-0 ma-0 text-none"
                block
                color="blue"
                prepend-icon="i-mdi-play-circle"
                @click="openChapters(row)"
              >
                Mulai</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
        <v-card
          v-else
          rounded="lg"
          class="px-3 py-4 bg-grey-darken-1"
          @click="chapterNonAccsessible()"
        >
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="2" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon color="pink-lighten-3" icon="i-mdi-lock" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <LazyBeforeStart
    :dialog="dialog"
    :topicid="topicId"
    @start="start1stChapters()"
  />
  <v-bottom-sheet v-model="sheetScoreboard">
    <LazyScoreboard
      :topicid="topicId"
      :chapterid="chapter.id"
      @closeit="sheetScoreboard = false"
    />
  </v-bottom-sheet>
</template>
