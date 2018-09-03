import request from '@/utils/request'

export function getUserDetail(key) {
  return request({
    url: '/mgr/sysUser/getUserAndAllRoles',
    method: 'get',
    params: {
      key
    }
  })
}

export function updatePwd(userName, oldUserPwd, newUserPwd) {
  return request({
    url: `/mgr/sysUser/updatePassword/${userName}/${oldUserPwd}`,
    method: 'put',
    params: {
      newUserPwd
    }
  })
}