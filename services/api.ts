import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthMe = error.config?.url?.includes('/auth/me')
    const isLogout = error.config?.url?.includes('/auth/logout')

    if (error.response?.status === 401) {
      if (!isAuthMe && !isLogout && typeof window !== 'undefined') {
        window.location.href = '/iniciar-sesion'
      }
    }
    return Promise.reject(error)
  }
)
