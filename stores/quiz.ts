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
  const questionMode = ref('quick')
  const quizzes = ref([])
  const quizDetail = ref({})

  const getQuizzes = (async () => {
    try {
      const { data } = await $api.get('/Quizzes', {
        params: {
          filter: {
            where: { is_active: true }
          }
        }
      })
      quizzes.value = data

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })

  const getQuizById = (async (id: String) => {
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
      const { data } = await $api.get('/Topics', {
        params: {
          filter: {
            where: { is_active: 1 },
            fields: ['id', 'title']
          }
        }
      })
      topics.value = data
      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  })
  return { getQuizzes, getQuizById, deleteAccount, getTopics, quizzes, quizDetail, questionMode, topics }
})