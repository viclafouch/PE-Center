import { IS_DEV } from '@shared/constants'

const API_URL = IS_DEV
  ? 'https://pe-crawler.herokuapp.com'
  : 'https://pe-crawler.herokuapp.com'

const request = (path = '/', params = {}) => {
  const url = API_URL + path
  return fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...params
  }).then(res => (res.ok ? res.json() : Promise.reject(res)))
}

export const getAllProducts = params => request('/products', params)

export const getThreads = ({ productCode, lang }, params) =>
  request(`/threads/${productCode}?hl=${lang}`, params)
