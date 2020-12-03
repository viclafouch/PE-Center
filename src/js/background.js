import * as api from '@shared/api'
import { SEND_THEME } from '@shared/constants'
import { getProductLogoByName, getThreadUrl } from '@utils'
import {
  browser_,
  clearNotification,
  createAlarm,
  getBadgeText,
  getBrowserStorage,
  notifyBrowser,
  openLink,
  setBadgeText,
  setBrowserStorage
} from '@utils/browser'

import defaultStore from './stores/config/default'
import settingsStore from './stores/config/settings'

const defaultSettingsItems = Object.keys(settingsStore).map(key => ({
  key,
  defaultValue: settingsStore[key]
}))

const defaultAppItems = [
  {
    key: 'enableNotifications',
    defaultValue: defaultStore.enableNotifications
  },
  {
    key: 'currentThreads',
    defaultValue: []
  },
  {
    key: 'threadsIdViewed',
    defaultValue: []
  }
]

browser_.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type, payload } = request
  switch (type) {
    case SEND_THEME:
      browser_.browserAction.setPopup({ popup: `popup-${payload.theme}.html` })
      sendResponse(undefined)
      break
    default:
      sendResponse(undefined)
      break
  }
  return true
})

const notifyThread = async ({ thread, openThreadLinkIn, product }) => {
  const notifId = 'new_thread'
  const link = getThreadUrl({
    openIn: openThreadLinkIn,
    threadUuid: thread.uuid,
    communityId: product.communityId,
    productCode: product.code
  })

  await notifyBrowser(notifId, {
    title: thread.title.substring(0, 20),
    type: 'basic',
    iconUrl: getProductLogoByName(product.code, 150),
    message: `${thread.description.substring(0, 35)}...`,
    isClickable: true,
    contextMessage: link
  })

  const timeout = setTimeout(() => {
    clearNotification(notifId)
  }, 5000)

  browser_.notifications.onClicked.addListener(async notifId => {
    clearTimeout(timeout)

    const defaultStorage = await getBrowserStorage(
      'local',
      null,
      defaultAppItems
    )

    if (!defaultStorage.threadsIdViewed.includes(thread.id)) {
      const threadsIdViewed = [...defaultStorage.threadsIdViewed, thread.id]
      await setBrowserStorage('local', { threadsIdViewed })
    }

    clearNotification(notifId)
    openLink(link, '_blank')
  })
}

async function start() {
  const settings = await getBrowserStorage('sync', null, defaultSettingsItems)
  const defaultStorage = await getBrowserStorage('local', null, defaultAppItems)

  const { enableNotifications, currentThreads } = defaultStorage
  const { productsIdSelected, lang, openThreadLinkIn } = settings

  if (productsIdSelected.length === 0) {
    return
  }

  try {
    const { products } = await api.getAllProducts()

    const threadsPromised = []

    for (const id of productsIdSelected) {
      const product = products.find(p => p.id === id)
      const promise = api.getThreads({ lang, productCode: product.code })
      threadsPromised.push(promise)
    }

    let allThreads = await Promise.all(threadsPromised)
    allThreads = allThreads.flatMap(t => t.threads)

    const newThreads = allThreads.filter(thread => {
      return !currentThreads.some(currentThread => {
        return currentThread.uuid === thread.uuid
      })
    })

    if (enableNotifications) {
      const lastNewThread = newThreads?.[0]
      if (lastNewThread) {
        const product = products.find(p => p.id === lastNewThread.ProductId)
        notifyThread({
          thread: lastNewThread,
          openThreadLinkIn,
          product
        })
      }
    }

    await setBrowserStorage('local', { currentThreads: allThreads })
    const previousNbNewThreads = Number(await getBadgeText())

    let total = previousNbNewThreads + newThreads.length
    if (total > 50) {
      total = '50+'
    }

    await setBadgeText(total || '')
  } catch (error) {
    console.error(error)
  }
}

;(async () => {
  createAlarm('threads', {
    delayInMinutes: 2,
    periodInMinutes: 1
  })

  browser_.alarms.onAlarm.addListener(alarmInfo => {
    if (alarmInfo.name === 'threads') {
      start()
    }
  })

  getBrowserStorage('sync', null, defaultSettingsItems).then(settings => {
    browser_.browserAction.setPopup({ popup: `popup-${settings.theme}.html` })
  })
})()
