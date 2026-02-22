// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useRankinStore = defineStore(
  "ranks",
  () => {
    const { $api } = useNuxtApp();

    const player = ref<Player>({
      id: "-",
      name: "",
    });
    const chapterOpened = ref<Int[]>([]);
    const ranks = ref<Rank[]>([]);
    const numOfQuestions = ref<number>(0);

    const FreeSaveRecord = async (payload: Rank) => {
      try {
        if (
          payload.playername === "" ||
          payload.topic_id === 0 ||
          payload.chapter_id === 0 ||
          payload.total_point <= 0 ||
          payload.total_time <= 0
        ) {
          return Promise.resolve(true);
        }

        if (player.value.id === "-") {
          const { data } = await $api.post("/ranks/createPlayer");
          player.value = {
            id: data,
            name: payload.playername,
          };
        }

        await $api.post("/ranks", {
          player_id: player.value.id,
          playername: player.value.name,
          topic_id: payload.topic_id,
          chapter_id: payload.chapter_id,
          total_point: payload.total_point,
          total_time: payload.total_time,
        });
        chapterOpened.value.push(payload.chapter_id);
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const GetFreeRecord = async (payload: {
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

    const CountQuestionInTopic = async (topic_id: number) => {
      try {
        const { data } = await $api.get(`/topics/${topic_id}/countQuestion`);
        numOfQuestions.value = data.count;
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    const CountQuestionInChapter = async (chapter_id: number) => {
      try {
        const { data } = await $api.get(`/chapter/${chapter_id}/countQuestion`);
        numOfQuestions.value = data.count;
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      }
    };

    return {
      FreeSaveRecord,
      GetFreeRecord,
      CountQuestionInTopic,
      CountQuestionInChapter,
      ranks,
      player,
      numOfQuestions,
      chapterOpened,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
