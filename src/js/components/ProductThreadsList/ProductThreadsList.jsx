import React, { useEffect, useState } from 'react'
import ListItem from '@components/ListItem/ListItem'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import * as api from '@shared/api'
import { DefaultContext } from '@stores/Default'
import { getProductLogoByName } from '@utils'
import PropTypes from 'prop-types'

import {
  AvatarProduct,
  ListStyled,
  ListSubheaderStyled,
  ProductName
} from './product-threads.styled'

function ProductThreadsList({ product, lang, onClick }) {
  const [isLoading, setIsLoading] = useState(true)
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
        if (error.name !== 'AbortError') {
          console.error(error)
        }
      } finally {
        setIsLoading(false)
      }
    }
    init()
    return () => abortController.abort()
  }, [product, lang])

  return (
    <ListStyled>
      <ListSubheaderStyled>
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <AvatarProduct src={getProductLogoByName(product.name)} />
          </ListItemAvatar>
          <ProductName color="secondary" variant="subtitle2" component="span">
            {product.name}
          </ProductName>
        </Box>
        {isLoading && <CircularProgress size={15} />}
      </ListSubheaderStyled>
      {threads.items.map(item => (
        <DefaultContext.Consumer key={item.id}>
          {([defaultState]) => {
            const isViewed = defaultState.threadsIdViewed.includes(item.id)
            return (
              <ListItem
                button
                transparent={isViewed}
                onClick={onClick}
                item={item}
                description={item.description}
                title={item.title}
              />
            )
          }}
        </DefaultContext.Consumer>
      ))}
    </ListStyled>
  )
}

ProductThreadsList.propTypes = {
  product: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

ProductThreadsList.defaultProps = {
  onClick: () => {}
}

export default ProductThreadsList
