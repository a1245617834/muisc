import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true

axios.defaults.baseURL = 'https://autumnfish.cn'
axios.interceptors.request.use(config => {
    if (config.meth === 'post' && !(config.data instanceof FormData)) {
      config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      }
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(
    res => {
      return res
    }, err => {
      return Promise.resolve(err)
    }
  )
  export default axios