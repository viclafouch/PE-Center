import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ProductThreadsList from '@components/ProductThreadsList/ProductThreadsList'
import Typography from '@material-ui/core/Typography'

import { Intro, View } from '../views.styled'
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

  return (
    <View className="hide-scrollbar" style={{ padding: 0 }}>
      {products.length > 0 ? (
        <ThreadsList subheader={<li />}>
          {products.map(product => {
            return (
              <ThreadsListItem key={product.id}>
                <ProductThreadsList product={product} lang={settings.lang} />
              </ThreadsListItem>
            )
          })}
        </ThreadsList>
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
