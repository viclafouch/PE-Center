import React, { useEffect, useState } from 'react'
import ListItem from '@components/ListItem/ListItem'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import * as api from '@shared/api'
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
        console.log(error) // TODO
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
        <ListItem
          button
          onClick={onClick(item, product)}
          key={item.id}
          description={item.description}
          title={item.title}
        />
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
