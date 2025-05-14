// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useQuizStore = defineStore('quiz', () => {
  const { $api } = useNuxtApp()

  type Topic = {
    id: number,
    title: string
  }
  const topics = ref<Topic[]>([])
  const topicDetail = ref<Topic>({ id: 0, title: '' })

  const questionMode = ref('quick')

  type Quiz = {
    id: number,
    desc: string,
    title: string,
    num_of_level: number,
    topicsId: number
  }
  const quizzes = ref<Quiz[]>([])
  const quizDetail = ref<Quiz>({
    id: 0,
    desc: '',
    title: '',
    num_of_level: 0,
    topicsId: 0
  })

  type CompletedQuiz = {
    quizId: number,
    questionLevel: number[]
  }
  const isDone = ref<CompletedQuiz[]>([])

  const getQuizzes = (async () => {
    try {
      const { data } = await $api.get('/Quizzes', {
        params: {
          filter: {
            where: { topicsId: topicDetail.value.id, is_active: true },
            order: 'position ASC'
          }
        }
      })
      quizzes.value = data

      if (topicDetail.value.id < 1 || data.length < 1) {
        return Promise.resolve()
      }

      const found = isDone.value.findIndex(obj => obj.quizId === data[0].id)
      if (found < 0) {// not found
        isDone.value.push({ quizId: data[0].id, questionLevel: [1] })
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const getQuizById = (async (id: number) => {
    try {
      const { data } = await $api.get(`/Quizzes/${id}`, {
        params: {
          filter: {
            where: { is_active: true }
          }
        }
      })
      quizDetail.value = data

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

  const openNextLevel = (quizId: number, theLevel: number) => {
    const quizFound = isDone.value.find(obj => obj.quizId === quizId)
    if (!quizFound) {
      return
    }

    const levelFound = quizFound.questionLevel.indexOf(theLevel)
    if (levelFound >= 0) {
      return
    }

    quizFound.questionLevel.push(theLevel)
  }

  const openNextQuiz = (quizId: number) => {
    const index = quizzes.value.findIndex(obj => obj.id === quizId)
    const nextQuiz = quizzes.value[index + 1]
    isDone.value.push({ quizId: nextQuiz.id, questionLevel: [1] })
  }

  return {
    getQuizzes, getQuizById, deleteAccount, getTopics, openNextLevel, openNextQuiz,
    quizzes, quizDetail, questionMode, topics, topicDetail, isDone
  }
})