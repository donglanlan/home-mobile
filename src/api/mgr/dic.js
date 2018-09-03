import request from '@/utils/request'

export function listByParentDicKey(parentDicKey) {
  return request({
    url: '/mgr/sysDic/parentDicKey',
    method: 'get',
    params: {
      parentDicKey: parentDicKey
    }
  })
}