import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSettings } from '@/js/stores/SettingsContext'
import { getThreads } from '@shared/api/Thread.api'
import Typography from '@material-ui/core/Typography'
import { Intro } from '@styled'
import { useTranslation } from 'react-i18next'
import ListThreads from '@components/ListThreads/ListThreads'
import { getBrowserStorage, setBrowserStorage } from '@utils/browser'

const MainList = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`

export function RssFeed() {
  const { t } = useTranslation()
  const [threads, setThreads] = useState([])
  const [{ productsSelected, lang }] = useSettings()

  useEffect(() => {
    const controller = new AbortController()
    const loadThreads = async () => {
      try {
        const { threadsUuidReaded } = await getBrowserStorage('local')
        const response = await getThreads({ productsId: productsSelected.map(p => p.id), lang }, controller.signal)
        let { result } = response
        result = result.map(item => ({
          ...item,
          threads: item.threads.map(thread => ({
            ...thread,
            readed: threadsUuidReaded.includes(thread.uuid)
          }))
        }))

        setThreads(
          result.map(item => {
            item.product.visible = productsSelected
              .filter(product => product.visible)
              .some(product => product.id === item.product.id)
            item.product.icon = `${item.product.name
              .toLowerCase()
              .split(' ')
              .join('-')}-64.png`
            return item
          })
        )

        const currentThreadReaded = result.map(e => e.threads.filter(y => y.readed)).flat()
        const newThreadsRead = threadsUuidReaded.filter(uuid => currentThreadReaded.some(e => e.uuid === uuid))

        setBrowserStorage('local', { threadsUuidReaded: newThreadsRead })
      } catch (error) {
        console.log(error)
      }
    }
    if (productsSelected.length > 0 && lang) {
      loadThreads()
    }
    return () => {
      controller.abort()
    }
  }, [productsSelected, lang])

  return (
    <div className="main-content">
      {productsSelected.filter(e => e.visible).length === 0 && (
        <Intro>
          <img src="/images/undraw_Outer_space_drqu.svg" alt="RSS Feed" />
          <Typography component="h1" variant="h6">
            {t('feedTitle')}
          </Typography>
          <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
            {t('feedIntro')}
          </Typography>
        </Intro>
      )}
      {productsSelected.filter(e => e.visible).length !== 0 && (
        <MainList>
          <ListThreads threads={threads} />
        </MainList>
      )}
    </div>
  )
}

export default memo(RssFeed)
