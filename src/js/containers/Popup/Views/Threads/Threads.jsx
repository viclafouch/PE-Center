import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ProductThreadsList from '@components/ProductThreadsList/ProductThreadsList'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { ADD_THREAD_VIEWED } from '@stores/constants'
import { getThreadUrl } from '@utils'
import { openLink } from '@utils/browser'

import { Intro, View, ViewBoxLoading } from '../views.styled'
import { ThreadsList, ThreadsListItem } from './threads.styled'

import { DefaultContext } from '@/js/stores/Default'
import { SettingsContext } from '@/js/stores/Settings'

function Threads() {
  const { t } = useTranslation()
  const [defaultState, defaultDispatch] = useContext(DefaultContext)
  const [settings] = useContext(SettingsContext)
  const listRef = useRef(null)

  const products = useMemo(
    () =>
      defaultState.products.filter(p =>
        settings.productsIdSelected.some(id => id === p.id)
      ),
    [defaultState.products, settings.productsIdSelected]
  )

  const handleClickThread = useCallback(
    thread => {
      const product = products.find(p => p.id === thread.ProductId)
      const url = getThreadUrl({
        threadUuid: thread.uuid,
        communityId: product.communityId,
        productCode: product.code,
        openIn: settings.openThreadLinkIn
      })

      defaultDispatch({
        type: ADD_THREAD_VIEWED,
        payload: {
          threadId: thread.id
        }
      })

      openLink(url)
    },
    [settings.openThreadLinkIn, products, defaultDispatch]
  )

  const handleReload = useCallback(top => {
    listRef.current.scrollTop = top
  }, [])

  return (
    <View className="hide-scrollbar">
      {products.length > 0 ? (
        <ThreadsList subheader={<li />} ref={listRef}>
          {products.map(product => {
            return (
              <ThreadsListItem key={product.id}>
                <ProductThreadsList
                  onClick={handleClickThread}
                  onReload={handleReload}
                  product={product}
                  limitThreadsPerProduct={settings.limitThreadsPerProduct}
                  lang={settings.lang}
                />
              </ThreadsListItem>
            )
          })}
        </ThreadsList>
      ) : settings.productsIdSelected.length > 0 ? (
        <ViewBoxLoading>
          <CircularProgress size={20} />
        </ViewBoxLoading>
      ) : (
        <Intro>
          <img
            src="/images/space-ship.svg"
            alt="Browse threads"
            width="160"
            height="130"
          />
          <Typography component="h1" variant="h6">
            {t('feedTitle')}
          </Typography>
          <Typography component="p" variant="body2">
            {t('feedIntro')}
          </Typography>
        </Intro>
      )}
    </View>
  )
}

export default Threads
