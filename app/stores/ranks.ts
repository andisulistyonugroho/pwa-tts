// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useRankinStore = defineStore("ranks", () => {
  const { $api } = useNuxtApp();

  const ranks = ref<Rank[]>([]);

  const FreeSaveRecord = async (payload: Rank) => {
    try {
      if (
        payload.playername === "" ||
        payload.topic_id === 0 ||
        payload.chapter_id === 0 ||
        payload.total_point <= 0 ||
        payload.total_time <= 0
      )
        return Promise.resolve(true);

      await $api.post("/ranks", {
        playername: payload.playername,
        topic_id: payload.topic_id,
        chapter_id: payload.chapter_id,
        total_point: payload.total_point,
        total_time: payload.total_time,
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const GetFreeRecordInChapter = async (payload: {
    topic_id: number;
    chapter_id: number;
  }) => {
    try {
      const { data } = await $api.get("/ranks", {
        params: {
          topic_id: payload.topic_id,
          chapter_id: payload.chapter_id,
        },
      });
      ranks.value = data;
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    FreeSaveRecord,
    GetFreeRecordInChapter,
    ranks,
  };
});
