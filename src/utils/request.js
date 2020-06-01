import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getRefreshToken } from './auth'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const isRefreshUrl = config.url.includes('token/refresh')
    if (store.getters.token && !isRefreshUrl) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    console.log('' + error)
    const origRequest = error.config
    const response = error.response
    if (response.status === 401 && origRequest.url !== '/token') {
      if (origRequest.url.includes('token/refresh')) {
        console.log('Refresh has expired')
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      } else {
        console.log('Refreshing access token')
        const refreshData = await service.post('token/refresh', { refresh: getRefreshToken() })
        await store.dispatch('user/setToken', refreshData.access)
        return service(origRequest)
      }
    } else if (response.status === 401) {
      const message = response.data.detail
      Message.error(message)
    }
    return Promise.reject(error)
  }
)

export default service
