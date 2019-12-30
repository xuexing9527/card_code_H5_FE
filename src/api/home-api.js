import { POST, GET } from '../apiconfig/index'

// 登录接口
export function login(params) {
  return POST(`users/login`, params)
}

// 查看详情接口
export function detail() {
  return GET(`users/detail`, {})
}

// 编辑详情接口
export function add(params) {
  return POST(`users/add`, params)
}
