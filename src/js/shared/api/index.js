const apiUrl = new URL('http://localhost:3000')

export const fetchCrawler = (url, params) => {
  if (typeof url === 'string' && url.startsWith('/')) {
    apiUrl.pathname = url
    return fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...params
    }).then(res => (res.ok ? res.json() : Promise.reject(res)))
  }
  return fetch(url, params)
}
