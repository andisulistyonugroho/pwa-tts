// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions
import { Dayjs } from 'dayjs'
export const useQuizStore = defineStore('quiz', () => {
  const { $api, $dayjs } = useNuxtApp()

  const topics = ref<Topic[]>([])
  const topicDetail = ref<Topic>({ id: 0, title: '' })

  const quizzes = ref<Quiz[]>([])
  const selectedQuiz = ref<Quiz>()

  const quizStartTime = ref<Dayjs>($dayjs())
  const quizEndTime = ref<Dayjs>($dayjs())

  const getQuizzes = (async () => {
    try {
      const { data } = await $api.get(`/topics/${topicDetail.value.id}/quiz`)
      quizzes.value = data

      if (topicDetail.value.id < 1 || data.length < 1) {
        return Promise.resolve()
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const deleteAccount = (async () => {
    try {
      await $api.post('/Users/deleteMyAccount')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const getTopics = (async () => {
    try {
      const { data } = await $api.get('/topics')
      topics.value = data
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })


  const openNextQuiz = (quizId: number) => {
    const index = quizzes.value.findIndex(obj => obj.id === quizId)
    const nextQuiz = quizzes.value[index + 1]
  }

  return {
    getQuizzes, deleteAccount, getTopics, openNextQuiz,
    quizzes, topics, topicDetail, selectedQuiz, quizStartTime, quizEndTime
  }
})