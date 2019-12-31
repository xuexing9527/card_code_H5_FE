/* eslint-disable */
import axios from 'axios'

// 封装请求拦截
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token')   // 获取token
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        config.headers['token'] = ''
        if(token != null){                          // 如果token不为null，否则传token给后台
            config.headers['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
	}
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let { data } = response
    if (data.message === 'token failure!') {    // 如果后台返回的错误标识为token过期，则重新登录
      // localStorage.removeItem('token')          // token过期，移除token
      // 进行重新登录操作
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
// 封装post请求
export function POST(requestUrl, params = '') {
  return axios({
    url: requestUrl,
    method: 'post',
    data: params,
  })
}
// 封装post请求
export function GET(requestUrl, params = '') {
  return axios({
    url: requestUrl,
    method: 'get',
    data: params,
  })
}
