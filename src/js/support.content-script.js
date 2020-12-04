import { addThreadUuidViewed } from '@utils'
import { getBadgeText, getBrowserStorage, setBadgeText } from '@utils/browser'

const isOnCommunity = href =>
  href.startsWith('https://support.google.com/s/community/')

const handleChangeUrl = async href => {
  const url = decodeURI(href)

  if (isOnCommunity(url)) {
    const urlSplitted = url.split('/')
    const threadIndex = urlSplitted.findIndex(k => k === 'thread')
    if (threadIndex !== -1 && urlSplitted.length > threadIndex) {
      const uuid = parseInt(urlSplitted[threadIndex + 1])
      if (!isNaN(uuid)) {
        const { currentThreads, threadsUuidViewed } = await getBrowserStorage(
          'local',
          ['currentThreads', 'threadsUuidViewed'],
          [
            {
              key: 'currentThreads',
              defaultValue: []
            },
            {
              key: 'threadsUuidViewed',
              defaultValue: []
            }
          ]
        )

        const threadExist = currentThreads.find(thread => thread.uuid === uuid)
        if (threadExist && !threadsUuidViewed.includes(uuid)) {
          addThreadUuidViewed(uuid)
          const currentNewThreadsNoViewed = Number(await getBadgeText())
          await setBadgeText(currentNewThreadsNoViewed - 1)
        }
      }
    }
  }
}

function start() {
  let lastHref = location.href

  handleChangeUrl(lastHref)

  const events = [
    'popstate',
    'click',
    'keydown',
    'keyup',
    'touchstart',
    'touchend'
  ]

  events.forEach(eventType => {
    window.addEventListener(eventType, () => {
      requestAnimationFrame(() => {
        const currentHref = location.href
        if (currentHref !== lastHref) {
          lastHref = currentHref
          handleChangeUrl(currentHref)
        }
      })
    })
  })
}

start()
