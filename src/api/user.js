import request from '../utils/request.js'
import store from '../store/index.js'
export function login (data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
export function sendSms (mobile) {
  return request({
    url: '/v1_0/sms/codes/' + mobile,
    method: 'GET'
  })
}

export function getuserInfo () {
  return request({
    url: '/v1_0/user',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + store.state.token
    }
  })
}

/**
 * 添加关注
 */
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注
 */
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}

/**
 * 点赞
 */
export const addLike = articleId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}

/**
 * 取消点赞
 */
export const deleteLike = articleId => {
  return request({
    method: 'DELETE',
    // !路径参数
    url: `/v1_0/article/likings/${articleId}`
  })
}

/**
 * 获取用户个人资料
 */
// 获取指定用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新个人资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 更新头像
 */
export const updateUserAvatar = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
