import { isDev } from '@utils/utils'

const apiUrl = new URL(isDev ? 'http://localhost:3000' : 'https://crawler.victor-de-la-fouchardiere.fr')

export const fetchCrawler = (url, params) => {
  if (typeof url === 'string' && url.startsWith('/')) {
    apiUrl.pathname = url
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...params,
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
  }
  return fetch(url, params)
}
