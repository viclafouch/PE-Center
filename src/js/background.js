import { browser } from '@utils/browser'

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'changeTheme' && request.theme) {
    browser.browserAction.setPopup({ popup: `popup-${request.theme}.html` })
    sendResponse(true)
  }
  return true
})
