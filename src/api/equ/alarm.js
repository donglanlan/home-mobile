import request from '@/utils/request'

export function getAlarmList(query) {
  return request({
    url: '/equ/Alarm/page',
    method: 'get',
    params: query
  })
}