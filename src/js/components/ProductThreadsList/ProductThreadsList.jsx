import React, { useCallback, useEffect, useRef, useState } from 'react'
import ListItem from '@components/ListItem/ListItem'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import CachedIcon from '@material-ui/icons/Cached'
import * as api from '@shared/api'
import { DefaultContext } from '@stores/Default'
import { getProductLogoByName } from '@utils'
import PropTypes from 'prop-types'

import {
  AvatarProduct,
  ListStyled,
  ListSubheaderStyled,
  LoadingThreads,
  ProductName
} from './product-threads.styled'

function ProductThreadsList({
  product,
  lang,
  limitThreadsPerProduct,
  onClick,
  onReload
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [threads, setThreads] = useState({
    items: [],
    lastUpdate: null
  })
  const listRef = useRef()
  const controller = useRef()

  const init = useCallback(async () => {
    try {
      setIsLoading(true)
      controller.current = new AbortController()
      const { last_update, threads } = await api.getThreads(
        { productCode: product.code, lang, limit: limitThreadsPerProduct },
        { signal: controller.current.signal }
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
  }, [product, lang, limitThreadsPerProduct])

  useEffect(() => {
    init()
    return () => {
      if (controller.current?.signal.aborted === false) {
        controller.current.abort()
      }
    }
  }, [init])

  const reload = async () => {
    await init()
    onReload(listRef.current.offsetTop)
  }

  return (
    <ListStyled id={product.code} ref={listRef}>
      <ListSubheaderStyled>
        <Box display="flex" alignItems="center">
          <ListItemAvatar>
            <AvatarProduct src={getProductLogoByName(product.name)} />
          </ListItemAvatar>
          <ProductName color="secondary" variant="subtitle2" component="span">
            {product.name}
          </ProductName>
        </Box>
        {isLoading ? (
          <LoadingThreads size={15} />
        ) : (
          <IconButton color="primary" size="small" onClick={reload}>
            <CachedIcon />
          </IconButton>
        )}
      </ListSubheaderStyled>
      {threads.items.map(item => (
        <DefaultContext.Consumer key={item.id}>
          {([defaultState]) => {
            const isViewed = defaultState.threadsUuidViewed.includes(item.uuid)
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
  limitThreadsPerProduct: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

ProductThreadsList.defaultProps = {
  onClick: () => {}
}

export default ProductThreadsList
