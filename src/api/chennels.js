
import request from '../utils/request.js'
export function getUserChannels () {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

export function getAllChannels () {
  return request({
    url: '/v1_0/channels',
    method: 'get'
  })
}

export function updataChannels (data) {
  return request({
    url: '/v1_0/user/channels',
    method: 'put',
    data
  })
}
