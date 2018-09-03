import request from '@/utils/request'

export function getKeyPerson(query) {
  return request({
    url: '/community/person/keyPersonByCommunityId',
    method: 'get',
    params: query
  })
}

export function getKeyPersonByName(query) {
  return request({
    url: '/community/person/keyPersonByName',
    method: 'get',
    params: query
  })
}

export function getPerson(query) {
  return request({
    url: '/community/personCommunity/page',
    method: 'get',
    params: query
  })
}

export function getPersonByProp(query) {
  return request({
    url: '/community/person/findByKeyPersonProp',
    method: 'get',
    params: query
  })
}

export function getDetail(query) {
  return request({
    url: '/community/person/findByPersonIdAndCommunityId',
    method: 'get',
    params: query
  })
}

export function getListByPoliceId(userId ) {
  return request({
    url: '/community/person/findInfoBypoliceId',
    method: 'get',
    params: {
      userId 
    }
  })
}

export function recognize(type, obj) {
  return request({
    url: 'community/baidu/recognize?type=' + type,
    method: 'post',
    data: obj
  })
}

/* export function addPerson(obj) {
  return request({
    url: '/community/person/add',
    method: 'post',
    data: obj
  })
} */