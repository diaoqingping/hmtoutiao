import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import jsonBigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
if (local.getUser()) {
  axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
}
axios.interceptors.request.use(config => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(res => res, err => {
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})

axios.defaults.transformResponse = [data => {
  try {
    return jsonBigInt.parse(data)
  } catch (error) {
    return data
  }
}]
export default axios
