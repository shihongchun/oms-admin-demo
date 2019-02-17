import axios from 'axios'
import doCookie from '../util/cookie'
const http = axios.create({
  baseURI: 'http://127.0.0.1:8082',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'x-Requested-With': 'XMLHttpRequest'
  }
})
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
http.interceptors.request.use(
  config => {
    const token = doCookie.getCookie('account') // 获取Cookie
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    }
    if (token) {
      config.params = {'token': token} // 后台接收的参数，后面我们将说明后台如何接收
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
http.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error.response.data)
  })

http.get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params,
      headers: {
        'x-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
http.post = function (url, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
// axios.defaults.withCredentials = true
// axios.create({
//   baseURI: 'http://127.0.0.1:8082',
//   timeout: 5000
// })
// function handleUrl (url) {
//   url = base_url + url
//   return url
// }

// function handleResults (response) {
//   let res = response.data
//   let result = {
//     success: false,
//     message: '',
//     status: [],
//     errorCode: '',
//     data: {
//       total: 0,
//       results: []
//     }
//   }
//   if (res.success) {
//     result.data.total = res.total
//     result.data.results = res.results
//     result.success = true
//   }
//   if (!res.success) {
//     let code = res.errorCode
//     if (code === 400) {
//       console.log('传参错误')
//     }
//     result.errorCode = code
//     result.message = res.message
//   }
//   return result
// }

// function handleParams (data) {
//   return data
// }

export default http
