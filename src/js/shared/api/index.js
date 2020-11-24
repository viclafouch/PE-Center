import { IS_DEV } from '@shared/constants'

const API_URL = IS_DEV
  ? 'https://pe-crawler.herokuapp.com'
  : 'https://pe-crawler.herokuapp.com'

export const request = (pathname, params) => {
  const url = new URL(API_URL)
  url.pathname = pathname
  return fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    ...params
  }).then(res => (res.ok ? res.json() : Promise.reject(res)))
}

export const getAllProducts = () => request('/products')
