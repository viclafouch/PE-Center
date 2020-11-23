export const browser_ = chrome || browser

export const setBadgeText = text =>
  browser_.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  })

export const handleAnchor = event => {
  const element = event?.target
  if (element instanceof HTMLAnchorElement) {
    event.preventDefault()
    const href = element.href
    const target = element.target
    openLink(href, target)
  }
}

export const openLink = (url, target = false) => {
  if (browser_.tabs) {
    browser_.tabs.create({
      active: target === '_blank',
      url,
      pinned: false
    })
  } else {
    const win = window.open(url, target)
    win.focus()
  }
}
