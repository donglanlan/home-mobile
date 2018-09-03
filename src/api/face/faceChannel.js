import request from '@/utils/request'

export function getDefenceChannel(query) {
  return request({
    url: '/face/faceChannel/allChannelIncludeDefence',
    method: 'get',
    params: query
  })
}
