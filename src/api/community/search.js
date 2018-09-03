import request from '@/utils/request'

export function getSearchInfo(type, keyWord) {
  return request({
    url: '/community/search/searchInfo',
    method: 'get',
    params: {
      type,
      keyWord
    }
  })
}