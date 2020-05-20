import { fetchCrawler } from './index'

export const getThreads = (params = {}, signal) =>
  fetchCrawler('/threads', {
    signal,
    method: 'POST',
    body: JSON.stringify({
      productsId: params.productsId,
      lang: params.lang,
      limit: params.maxThreadsPerProduct,
    }),
  })
