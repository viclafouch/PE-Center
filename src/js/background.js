import { browser, getBrowserStorage, setBrowserStorage, openLink, getBadgeText } from '@utils/browser'
import { getThreads } from '@shared/api/Thread.api'
import { debug } from '@utils/utils'

const periodThreadsInMinutes = 2
const delayThreadsInMinutes = 1

async function createAlarm(name, options) {
  await browser.alarms.clear(name)
  await browser.alarms.create(name, options)
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'changeTheme' && request.theme) {
    browser.browserAction.setPopup({ popup: `popup-${request.theme}.html` })
    sendResponse(true)
  }
  if (request.type === 'reloadNotifs') {
    debug('Clear current alarm and create a new one')
    createAlarm('threads', {
      delayInMinutes: delayThreadsInMinutes,
      periodInMinutes: periodThreadsInMinutes
    })
    sendResponse(true)
  }
  return true
})

async function onOpenBrowser() {
  await createAlarm('threads', {
    delayInMinutes: delayThreadsInMinutes,
    periodInMinutes: periodThreadsInMinutes
  })
  const { theme } = await getBrowserStorage('sync')
  browser.browserAction.setPopup({ popup: `popup-${theme}.html` })
}

async function getNewThreads() {
  const { threads, threadsUuidReaded } = await getBrowserStorage('local')
  const { productsSelected, maxThreadsPerProduct, lang, displayNotifications, openLinkIn } = await getBrowserStorage('sync')
  const productsVisible = productsSelected.filter(e => e.visible)
  if (productsVisible.length === 0) {
    await browser.alarms.clear('threads')
    throw new Error('No products visible availble')
  }
  const response = await getThreads({
    productsId: productsVisible.map(p => p.id),
    lang,
    maxThreadsPerProduct
  })

  const allThreads = response.result.flatMap(e => e.threads)
  const newThreads = allThreads.filter(e => !threads.some(t => t.uuid === e.uuid))
  await setBrowserStorage('local', { threads: allThreads })

  const lastThread = newThreads.length > 0 ? newThreads[0] : null
  let lastThreadProduct
  if (lastThread) {
    lastThreadProduct = productsSelected.find(p => p.id === lastThread.ProductId)
    lastThreadProduct.icon = `${lastThreadProduct.name
      .toLowerCase()
      .split(' ')
      .join('-')}-150.png`
  }
  return {
    nbNewThreads: newThreads.length,
    displayNotifications,
    openLinkIn,
    lastThreadProduct,
    lastThread,
    threadsUuidReaded,
    maxTotalThreads: productsVisible.length * maxThreadsPerProduct
  }
}

async function handleAlarm(alarmInfo) {
  if (alarmInfo.name === 'threads') {
    debug('Alarm `threads` is ringing !')
    try {
      const {
        nbNewThreads,
        lastThread,
        displayNotifications,
        openLinkIn,
        lastThreadProduct,
        threadsUuidReaded,
        maxTotalThreads
      } = await getNewThreads()

      const currentBadgeText = await getBadgeText()
      const previousNbNewThreads =
        currentBadgeText === `${maxTotalThreads}+` ? maxTotalThreads : JSON.parse(currentBadgeText || 0)
      let totalNewThreads = nbNewThreads + previousNbNewThreads
      totalNewThreads = totalNewThreads > maxTotalThreads ? `${maxTotalThreads}+` : totalNewThreads
      totalNewThreads = totalNewThreads !== 0 ? totalNewThreads.toString() : ''

      browser.browserAction.setBadgeText({
        text: totalNewThreads
      })

      if (displayNotifications && lastThread) {
        const notifId = `_${Math.random()
          .toString(36)
          .substr(2, 9)}`
        const link = openLinkIn === 'console' ? lastThread.consoleUrl : lastThread.publicUrl

        browser.notifications.create(
          notifId,
          {
            title: lastThread.title.substring(0, 20),
            type: 'basic',
            iconUrl: browser.runtime.getURL(`/images/products/${lastThreadProduct.icon}`),
            message: `${lastThread.description.substring(0, 35)}...`,
            isClickable: true,
            contextMessage: link.toString()
          },
          () => {
            debug('New Notification !')
            browser.notifications.onClicked.addListener(id => {
              if (id === notifId) {
                debug('Notifications opened')
                browser.notifications.clear(id, async () => {
                  if (!threadsUuidReaded.includes(lastThread.uuid)) {
                    try {
                      threadsUuidReaded.push(lastThread.uuid)
                      await setBrowserStorage('local', { threadsUuidReaded })
                    } catch (error) {
                      console.warn(error)
                    }
                  }
                  openLink(link, true)
                  browser.browserAction.setBadgeText({
                    text: nbNewThreads - 1 ? JSON.stringify(nbNewThreads - 1) : ''
                  })
                })
              }
            })
          }
        )
      }
    } catch (error) {
      console.warn(error)
    }
  }
}

browser.alarms.onAlarm.addListener(handleAlarm)
onOpenBrowser()
