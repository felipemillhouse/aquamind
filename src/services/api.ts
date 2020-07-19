import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://127.0.0.1:3333',
  baseURL: 'https://my-json-server.typicode.com/felipemillhouse/demo',
})

export default api
