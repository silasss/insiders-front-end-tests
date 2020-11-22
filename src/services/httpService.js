import axios from 'axios'

const httpService = axios.create({
  baseURL: 'http://localhost:3001'
})

export default httpService
