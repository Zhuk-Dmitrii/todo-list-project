import axios from 'axios'

const API_KEY = 'ac63a67d-4fd6-4bf1-b175-cf547b98c254'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': API_KEY,
  },
})
