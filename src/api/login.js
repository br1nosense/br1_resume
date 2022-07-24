import request from '@/utils/request'

//request() 返回的是一个 Promise
export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    //withCredentials: true, //跨域允许携带cookie
    //timeout: 30000,
    //headers: { 'Content-Type': 'application/json', 'request-ajax': true },
    data: {
      username,
      password
    }
  })
}
