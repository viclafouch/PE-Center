import { IS_DEV } from '@shared/constants'

const API_URL = IS_DEV
  ? 'http://localhost:5000'
  : 'https://pe-crawler-static.vercel.app'

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

export const getThreads = ({ productCode, lang, limit }, params) =>
  request(`/threads/${productCode}?hl=${lang}&limit=${limit}`, params)

export const searchAnswers = (
  { productsId, lang, page, search },
  params = {}
) =>
  request(`/answers`, {
    method: 'POST',
    body: JSON.stringify({
      hl: lang,
      page: page,
      search: search,
      products_id: productsId
    }),
    ...params
  })
