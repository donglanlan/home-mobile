import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 1000})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getName() {
  return Cookies.get('name')
}

export function setName(name) {
  return Cookies.set('name', name, { expires: 1000})
}