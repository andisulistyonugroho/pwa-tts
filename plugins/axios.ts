import axios from "axios"
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { user, logout } = useAuthStore()

  let api = axios.create({ baseURL: config.public.apiBase })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = user.token
    return config
  })

  return {
    provide: {
      api: api
    }
  }
})