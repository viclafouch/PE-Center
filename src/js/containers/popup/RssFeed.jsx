import React, { useEffect, useState, useCallback } from 'react'
import { getThreads } from '@shared/api/Thread.api'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import ListThreads from '@components/ListThreads/ListThreads'
import { getBrowserStorage, setBrowserStorage, sendMessageToBackground } from '@utils/browser'
import { useSnackbar } from 'notistack'
import Loader from '@components/Loader/Loader'
import Button from '@material-ui/core/Button'
import { debug } from '@utils/utils'
import { Intro } from '@styled'
import { useSettings } from '@/js/stores/SettingsContext'

export function RssFeed() {
  const { t } = useTranslation()
  const [threads, setThreads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [{ productsSelected, lang, maxThreadsPerProduct }] = useSettings()

  const fetchThreads = useCallback(
    ({ controller = {} }) => {
      const fetching = async () => {
        try {
          setIsLoading(true)
          setIsError(false)
          const { threadsUuidReaded } = await getBrowserStorage('local')
          const { result } = await getThreads(
            { productsId: productsSelected.map(p => p.id), lang, maxThreadsPerProduct },
            controller.signal
          )
          const allThreadsWithProducts = [
            ...result.map(item => {
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
          ]
          setThreads(allThreadsWithProducts)
          const allThreads = result.flatMap(e => e.threads)
          await sendMessageToBackground('reloadNotifs')
          const currentThreadReaded = result.flatMap(e => e.threads.filter(y => y.readed))
          const newThreadsRead = threadsUuidReaded.filter(uuid => currentThreadReaded.some(e => e.uuid === uuid))

          setBrowserStorage('local', { threadsUuidReaded: newThreadsRead, threads: allThreads })
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
      if (productsSelected.length > 0 && lang) fetching()
      else setIsLoading(false)
    },
    [enqueueSnackbar, lang, maxThreadsPerProduct, productsSelected, t]
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchThreads({ controller })
    return () => controller.abort()
  }, [fetchThreads])

  let content = null

  if (isLoading) {
    content = <Loader />
  } else if (productsSelected.filter(e => e.visible).length === 0 || isError) {
    content = (
      <Intro>
        <img src="/images/undraw_Outer_space_drqu.svg" alt="RSS Feed" />
        <Typography component="h1" variant="h6">
          {!isError ? t('feedTitle') : t('error.unknown')}
        </Typography>
        {!isError && (
          <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
            {t('feedIntro')}
          </Typography>
        )}
        {isError && (
          <Button style={{ marginTop: 5 }} size="small" color="primary" onClick={() => fetchThreads({ controller: {} })}>
            {t('retry')}
          </Button>
        )}
      </Intro>
    )
  } else {
    content = <ListThreads threads={threads} />
  }

  return (
    <div className="main-content scrollBarOnHover" style={{ paddingTop: isLoading ? 16 : 0 }}>
      {content}
    </div>
  )
}

export default RssFeed
