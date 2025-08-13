// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useQuestionStore = defineStore("question", () => {
  const { $api } = useNuxtApp();

  const questions = ref<Question[]>([]);
  const numOfQuestion = ref(0);

  const getQuestionsByLevel = async (chapterId: number, level: number) => {
    try {
      const { data } = await $api.get(
        `/chapter/${chapterId}/${level}/question`,
      );
      questions.value = data;
      numOfQuestion.value = data.length;

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return { getQuestionsByLevel, questions, numOfQuestion };
});
