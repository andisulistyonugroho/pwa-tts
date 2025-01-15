// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useQuestionStore = defineStore('question', () => {
  const { $api } = useNuxtApp()

  const questions = ref([])
  const numOfQuestion = ref(0)

  const getQuestionsByLevel = (async (payload: { quizId: number, level: number }) => {
    try {
      const { data } = await $api.get('/Questions', {
        params: {
          filter: {
            where: {
              quizId: payload.quizId,
              the_level: payload.level,
              is_active: true
            },
            include: 'answer'
          }
        }
      })
      questions.value = data
      numOfQuestion.value = data.length

      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  return { getQuestionsByLevel, questions, numOfQuestion }
})