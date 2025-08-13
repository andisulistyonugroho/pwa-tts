// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
import { Dayjs } from "dayjs";
export const useChapterStore = defineStore("chapter", () => {
  const { $api, $dayjs } = useNuxtApp();

  const topics = ref<Topic[]>([]);
  const topicDetail = ref<Topic>({ id: 0, title: "" });

  const chapters = ref<Chapter[]>([]);
  const chapter = ref<Chapter>();

  const chapterStartTime = ref<Dayjs>($dayjs());
  const chapterEndTime = ref<Dayjs>($dayjs());

  const getChapters = async (id: number) => {
    try {
      const { data } = await $api.get(`/topics/${id}/chapter`);
      chapters.value = data;
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteAccount = async () => {
    try {
      await $api.post("/Users/deleteMyAccount");
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getTopics = async () => {
    try {
      const { data } = await $api.get("/topics");
      topics.value = data;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const openNextChapter = (chapterId: number) => {
    const index = chapters.value.findIndex((obj) => obj.id === chapterId);
    const nextchapters = chapters.value[index + 1];
  };

  const getTopicDetail = async (id: number) => {
    try {
      const { data } = await $api.get(`/topics/${id}`);
      topicDetail.value = data;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getChapterDetail = async (id: number) => {
    try {
      const { data } = await $api.get(`/chapter/${id}`);
      chapter.value = data;
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getChapters,
    deleteAccount,
    getTopics,
    getTopicDetail,
    getChapterDetail,
    openNextChapter,
    chapters,
    topics,
    topicDetail,
    chapter,
    chapterStartTime,
    chapterEndTime,
  };
});
