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
import { addThreadUuidViewed } from '@utils/index'

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
    key: 'threadsUuidViewed',
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
    await addThreadUuidViewed(thread.uuid)
    clearNotification(notifId)
    openLink(link, '_blank')
    const previousNbNewThreads = Number(await getBadgeText())
    await setBadgeText(previousNbNewThreads - 1)
  })
}

async function start() {
  const settings = await getBrowserStorage('sync', null, defaultSettingsItems)
  const defaultStorage = await getBrowserStorage('local', null, defaultAppItems)

  const {
    enableNotifications,
    currentThreads,
    threadsUuidViewed
  } = defaultStorage
  const {
    productsIdSelected,
    lang,
    openThreadLinkIn,
    limitThreadsPerProduct
  } = settings

  if (productsIdSelected.length === 0) {
    return
  }

  try {
    const { products } = await api.getAllProducts()

    const threadsPromised = []

    for (const id of productsIdSelected) {
      const product = products.find(p => p.id === id)
      const promise = api.getThreads({
        lang,
        productCode: product.code,
        limit: limitThreadsPerProduct
      })
      threadsPromised.push(promise)
    }

    let allThreads = await Promise.all(threadsPromised)
    allThreads = allThreads.flatMap(t => t.threads)

    const newThreads = allThreads.filter(thread => {
      const hasNotBeenViewed = !threadsUuidViewed.includes(thread.uuid)
      const isNewThread = !currentThreads.some(currentThread => {
        return currentThread.uuid === thread.uuid
      })
      return isNewThread && hasNotBeenViewed
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
    const currentNewThreadsNoViewed = Number(await getBadgeText())

    let total = currentNewThreadsNoViewed + newThreads.length
    if (total > 50) {
      total = '50+'
    }

    await setBadgeText(total || '')
  } catch (error) {
    console.error(error)
  }
}

const saveProducts = async () => {
  try {
    const { products } = await api.getAllProducts()
    setBrowserStorage('local', { products })
  } catch (error) {
    console.error(error)
  }
}

;(async () => {
  createAlarm('threads', {
    delayInMinutes: 2,
    periodInMinutes: 1
  })
  createAlarm('products', {
    delayInMinutes: 10,
    periodInMinutes: 10
  })

  browser_.alarms.onAlarm.addListener(alarmInfo => {
    if (alarmInfo.name === 'threads') {
      start()
    } else if (alarmInfo.name === 'products') {
      saveProducts()
    }
  })

  getBrowserStorage('sync', null, defaultSettingsItems).then(settings => {
    browser_.browserAction.setPopup({ popup: `popup-${settings.theme}.html` })
  })
})()
