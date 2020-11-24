import React, { useEffect, useState } from 'react'
import ListItem from '@components/ListItem/ListItem'
import * as api from '@shared/api'

import { ListStyled, ListSubheaderStyled } from './product-threads.styled'

function ProductThreadsList({ product, lang }) {
  const [threads, setThreads] = useState({
    items: [],
    lastUpdate: null
  })

  useEffect(() => {
    const abortController = new AbortController()
    const init = async () => {
      try {
        const { last_update, threads } = await api.getThreads(
          { productCode: product.code, lang },
          { signal: abortController.signal }
        )
        setThreads({
          items: threads,
          lastUpdate: last_update
        })
      } catch (error) {
        console.log(error) // TODO
      }
    }
    init()
    return () => abortController.abort()
  }, [product, lang])

  return (
    <ListStyled>
      <ListSubheaderStyled>{product.name}</ListSubheaderStyled>
      {threads.items.map(item => (
        <ListItem
          button
          key={item.id}
          description={item.description}
          title={item.title}
        />
      ))}
    </ListStyled>
  )
}

export default ProductThreadsList
