import request from '@/utils/request'

export function loginByUsername(username, password) {
  return request({
    url: '/uaa/oauth/token?grant_type=password&username=' + username + '&password=' + password,
    method: 'post',
    auth: {
      username: 'kingtake',
      password: '123'
    }
  })
}