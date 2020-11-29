import React, { useCallback, useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ProductThreadsList from '@components/ProductThreadsList/ProductThreadsList'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { getThreadUrl } from '@utils'
import { openLink } from '@utils/browser'

import { Intro, View, ViewBoxLoading } from '../views.styled'
import { ThreadsList, ThreadsListItem } from './threads.styled'

import { DefaultContext } from '@/js/stores/Default'
import { SettingsContext } from '@/js/stores/Settings'

function Threads() {
  const { t } = useTranslation()
  const [defaultState] = useContext(DefaultContext)
  const [settings] = useContext(SettingsContext)

  const products = useMemo(
    () =>
      defaultState.products.filter(p =>
        settings.productsIdSelected.some(id => id === p.id)
      ),
    [defaultState.products, settings.productsIdSelected]
  )

  const handleClickThread = useCallback(
    (thread, product) => event => {
      event.preventDefault()
      const url = getThreadUrl({
        threadUuid: thread.uuid,
        communityId: product.communityId,
        productCode: product.code,
        openIn: settings.openThreadLinkIn
      })
      openLink(url, '_blank')
    },
    [settings]
  )

  return (
    <View className="hide-scrollbar">
      {products.length > 0 ? (
        <ThreadsList subheader={<li />}>
          {products.map(product => {
            return (
              <ThreadsListItem key={product.id}>
                <ProductThreadsList
                  onClick={handleClickThread}
                  product={product}
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
      <div></div>
    </View>
  )
}

export default Threads
