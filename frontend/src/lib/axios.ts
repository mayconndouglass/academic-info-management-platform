import axios from 'axios'

export const wpApi = axios.create({
  baseURL: import.meta.env.VITE_API_WP_URL,
})

export const api = axios.create({
  baseURL: 'http://localhost:3333',
})
