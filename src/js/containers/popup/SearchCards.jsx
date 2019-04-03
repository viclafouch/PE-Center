import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import ListCards from '@components/ListCards/ListCards'
import CircularProgress from '@material-ui/core/CircularProgress'
import { DefaultContext } from '@/js/stores/DefaultContext'
import { SET_CARDS, REMOVE_CARDS } from '@/js/stores/reducer/constants'
import { wait } from '@utils/utils'
import { searchCards } from '@shared/api/Card.api'
import useSearchParams from '@shared/hooks/useSearchParams'
import Button from '@material-ui/core/Button'
import { useSettings } from '@/js/stores/SettingsContext'
import Typography from '@material-ui/core/Typography'
import { IllusTab } from '@containers/PopupContainer'
import { useTranslation } from 'react-i18next'

const Loader = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`

const Warning = styled.div`
  padding: 13px 15px;
  text-align: center;
`

const ViewMore = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

export function SearchCards() {
  const { t } = useTranslation()
  const [isSearching, setIsSearching] = useState(false)
  const [isEndOfList, setIsEndOfList] = useState(true)
  const [{ cards }, dispatch] = useContext(DefaultContext)
  const [{ page, value }, { setPage }] = useSearchParams()
  const [{ productsSelected }] = useSettings()

  const fetchCards = useCallback(
    async ({ numPage, products, searchValue }) => {
      const productsId = products.map(e => e.id)
      try {
        setIsSearching(true)
        await wait()
        const response = await searchCards({ productsId, page: numPage, search: searchValue })
        setIsEndOfList(numPage >= response.pages)
        dispatch({ type: SET_CARDS, cards: response.result })
      } catch (error) {
        console.log(error)
      } finally {
        setIsSearching(false)
      }
    },
    [dispatch]
  )

  useEffect(() => {
    if (!productsSelected.length) dispatch({ type: REMOVE_CARDS })
    else if (value) fetchCards({ numPage: page, products: productsSelected, searchValue: value })
  }, [dispatch, fetchCards, page, productsSelected, value])

  let content = (
    <IllusTab>
      <img src="/images/undraw_product_tour_foyt.svg" alt="RSS Feed" />
      <Typography component="h1" variant="h6">
        Search your help article
      </Typography>
      <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae.
      </Typography>
    </IllusTab>
  )

  if (!productsSelected.length) {
    content = (
      <Warning>
        <Typography component="p">{t('chooseProduct')}</Typography>
      </Warning>
    )
  } else if (value.trim() !== '' && !isSearching) {
    content = (
      <Warning>
        <Typography component="h1">{t('noResult')}</Typography>
      </Warning>
    )
  }

  return (
    <div className="main-content" style={{ paddingTop: !cards.length && isSearching ? 16 : 0 }}>
      {productsSelected.length && !!cards.length && <ListCards cards={cards} />}
      {!isSearching && !cards.length && content}
      {isSearching && (
        <Loader>
          <CircularProgress size={20} />
        </Loader>
      )}

      {!isSearching && !isEndOfList && value && (
        <ViewMore>
          <Button size="small" onClick={() => setPage(page + 1)}>
            {t('viewMore')}
          </Button>
        </ViewMore>
      )}
    </div>
  )
}

export default SearchCards
