import { fetchCrawler } from './index'

export const searchCards = ({ search = '', page = 1, productsId = [] }) =>
  fetchCrawler('/cards', {
    method: 'POST',
    body: JSON.stringify({
      search,
      page,
      productsId
    })
  })
