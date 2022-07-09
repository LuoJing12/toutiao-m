import request from '@/utils/request'
export function getSuggestion (q) {
  return request({
    url: '/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}

export function getResult (params) {
  return request({
    url: '/v1_0/search',
    method: 'get',
    params
  })
}
