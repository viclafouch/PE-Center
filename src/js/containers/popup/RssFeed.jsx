import React, { memo, useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useSettings } from '@/js/stores/SettingsContext'
import { getThreads } from '@shared/api/Thread.api'
import Typography from '@material-ui/core/Typography'
import { Intro } from '@styled'
import { useTranslation } from 'react-i18next'
import ListThreads from '@components/ListThreads/ListThreads'
import { getBrowserStorage, setBrowserStorage } from '@utils/browser'
import { useSnackbar } from 'notistack'
import Loader from '@components/Loader/Loader'
import Button from '@material-ui/core/Button'
import { debug } from '@utils/utils'

const MainList = styled.div`
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`

export function RssFeed() {
  const { t } = useTranslation()
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [{ productsSelected, lang }] = useSettings()

  const fetchThreads = useCallback(
    ({ controller = {} }) => {
      const fetching = async () => {
        try {
          setIsLoading(true)
          setIsError(false)
          const { threadsUuidReaded } = await getBrowserStorage('local')
          const response = await getThreads({ productsId: productsSelected.map(p => p.id), lang }, controller.signal)
          const { result } = response
          setThreads(
            result.map(item => {
              item.threads = item.threads.map(thread => ({
                ...thread,
                readed: threadsUuidReaded.includes(thread.uuid)
              }))
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
          if (error.name === 'AbortError') {
            debug('Fetch abort')
          } else {
            setIsError(true)
            console.log(error)
            enqueueSnackbar(t('error.unknown'), {
              variant: 'warning',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center'
              },
              autoHideDuration: 2000
            })
          }
        } finally {
          setIsLoading(false)
        }
      }
      if (productsSelected.length > 0 && lang) {
        fetching()
      } else {
        setIsLoading(false)
      }
    },
    [enqueueSnackbar, lang, productsSelected, t]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchThreads({ controller })
    return () => {
      controller.abort()
    }
  }, [fetchThreads])

  let content = null

  if (isLoading) {
    content = <Loader />
  } else if (productsSelected.filter(e => e.visible).length === 0 || isError) {
    content = (
      <Intro>
        <img src="/images/undraw_Outer_space_drqu.svg" alt="RSS Feed" />
        <Typography component="h1" variant="h6">
          {t('feedTitle')}
        </Typography>
        {!isError && (
          <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
            {t('feedIntro')}
          </Typography>
        )}
        {isError && (
          <Button size="small" onClick={() => fetchThreads({ controller: {} })}>
            {t('viewMore')}
          </Button>
        )}
      </Intro>
    )
  } else {
    content = (
      <MainList>
        <ListThreads threads={threads} />
      </MainList>
    )
  }

  return (
    <div className="main-content" style={{ paddingTop: isLoading ? 16 : 0 }}>
      {content}
    </div>
  )
}

export default memo(RssFeed)
