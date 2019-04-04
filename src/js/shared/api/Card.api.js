import { fetchCrawler } from './index'

export const searchCards = (params = {}) =>
  fetchCrawler('/cards', {
    method: 'POST',
    body: JSON.stringify({
      search: params.search,
      page: params.page,
      productsId: params.productsId,
      lang: params.lang
    })
  })
