import { fetchCrawler } from './index'

export const getAllProducts = () =>
  fetchCrawler('/products', {
    method: 'GET',
  })
