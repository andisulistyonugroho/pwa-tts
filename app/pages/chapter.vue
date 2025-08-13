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
const queryTopicId = route.query.topicid;

const dialog = ref(false);

let topicId = 0;
if (typeof queryTopicId === "string") {
  topicId = parseInt(queryTopicId);
}

const chapterIsOpen = (id: number) => {
  const topic = userPoint.value?.find(
    (obj) => obj.topic_id === topicDetail.value.id,
  );
  if (topic) {
    const found = topic.chapter_point.findIndex((obj) => obj.chapter_id === id);
    return found >= 0;
  }
  return false;
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

const start1stChapters = async () => {
  dialog.value = false;
  const firstChapter = chapters.value[0];
  if (firstChapter) {
    await getQuestionsByLevel(firstChapter.id, 1);
    navigateTo(`/questions?chapterid=${firstChapter.id}`);
  }
};

$bus.$emit("set-header", "Chapter");

await getTopicDetail(topicId);
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
          @click="openChapters(row)"
        >
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon color="teal" icon="i-mdi-lock-open-variant" />
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon size="large" class="i-mdi:chevron-right"
                >mdi-chevron-right</v-icon
              >
            </v-col>
          </v-row>
        </v-card>
        <v-card v-else rounded="lg" class="px-3 py-4 bg-grey-darken-1">
          <v-row class="flex-nowrap" no-gutters>
            <v-col cols="10" class="flex-grow-1 flex-shrink-0 text-h6">
              {{ row.title }}
            </v-col>
            <v-col cols="1" class="flex-grow-0 flex-shrink-0 text-right">
              <v-icon color="pink-lighten-3" icon="i-mdi-lock" />
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
  <LazyBeforeStart :dialog="dialog" @start="start1stChapters()" />
</template>
