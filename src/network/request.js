import axios from 'axios'

export function request(config) {
  // 1.创建axios实例

  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1 请求拦截的作用

  instance.interceptors.request.use(config => {
    // 这里必须返回，不然请求无法继续
    return config
  }, err => {
    // console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}