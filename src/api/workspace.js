import request from '@/utils/request'

export function getWorkspaces() {
  return request({
    url: '/workspace/',
    method: 'get'
  })
}

export function createWorkspace(data) {
  return request({
    url: '/workspace/',
    method: 'post',
    data
  })
}

export function getWorkspaceUsers(workspace_id) {
  return request({
    url: `/workspace/${workspace_id}/users`,
    method: 'get'
  })
}
