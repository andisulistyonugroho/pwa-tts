// In Setup Stores:
// ref()s become state properties
// computed()s become getters
// function()s become actions

export const useRankinStore = defineStore('ranks', () => {

  const { $api } = useNuxtApp()

  const DoSaveRecord = async () => {
    try {
      await $api.post('/ranks')
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return {
    DoSaveRecord
  }
})