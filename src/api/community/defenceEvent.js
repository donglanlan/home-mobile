import request from '@/utils/request'

export function getDefenceByDay(query) {
  return request({
    url: '/community/defenceEvent/findByPersonIdAndRecentdays',
    method: 'get',
    params: query
  })
}