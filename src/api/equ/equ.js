import request from '@/utils/request'

export function getEquGroups(userName, roleIds) {
  return request({
    url: '/equ/equ/findEquGroups',
    method: 'get',
    params: {
      userName,
      roleIds
    }
  })
}

export function getCommunityInfo(id) {
  return request({
    url: '/equ/equ/findCommunityInfo',
    method: 'get',
    params: {
      id
    }
  })
}

export function findEqus(groupId) {
  return request({
    url: '/equ/equ/findEqus?equTypeId=DNAKEDOOR&groupId=' + groupId,
    method: 'get'
  })
}

export function open(cmd_id, equ_id, username) {
  return request({
    url: '192.168.11.198:8012/gate/equ_ctrl',
    method: 'get',
    params: {
      cmd_id,
      equ_id,
      username
    }
  })
}