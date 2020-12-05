import { PUBLIC_THREAD_LINK } from '@shared/constants'

import { getBrowserStorage, setBrowserStorage } from './browser'

export const truncateAndReplace = (str = '', maxLength = 130) => {
  let text = str.replace(/&nbsp;/gi, ' ')
  if (text.length > maxLength) text = `${text.slice(0, maxLength)}...`
  return text
}

export const getThreadUrl = ({
  openIn,
  threadUuid,
  communityId,
  productCode
}) => {
  let url = ''
  if (openIn === PUBLIC_THREAD_LINK) {
    url = `https://support.google.com/${productCode}/thread/${threadUuid}`
  } else {
    url = `https://support.google.com/s/community/forum/${communityId}/thread/${threadUuid}`
  }
  return url
}

export const getAnswerUrl = ({ type, productCode, lang, answerUuid }) => {
  if (type === 'answer') {
    return `https://support.google.com/${productCode}/answer/${answerUuid}?hl=${lang}`
  } else if (type === 'troubleshooter') {
    return `https://support.google.com/${productCode}/troubleshooter/${answerUuid}?hl=${lang}`
  } else {
    return ''
  }
}

export const copyAsHyperlink = (text, url) => {
  let success = null
  const storage = document.createElement('div')
  const anchor = document.createElement('a')
  anchor.textContent = text
  anchor.setAttribute('href', url)
  storage.appendChild(anchor)
  storage.style.position = 'fixed'
  const b = document.body
  b.appendChild(storage)
  if (b.createTextRange) {
    const range = b.createTextRange()
    range.moveToElementText(storage)
    range.select()
    success = document.execCommand('copy')
  } else {
    const range = document.createRange()
    const g = window.getSelection
    range.selectNodeContents(storage)
    g().removeAllRanges()
    g().addRange(range)
    success = document.execCommand('copy')
    g().removeAllRanges()
  }
  storage.remove()
  return success
}

export const getProductLogoByName = (productName, size = 64) =>
  `/images/products/${productName
    .toLowerCase()
    .split(' ')
    .join('-')}-${size}.png`

export const colors = [
  'rgb(147, 52, 230)',
  'rgb(24, 128, 56)',
  'rgb(192, 202, 51)',
  'rgb(128, 134, 138)',
  'rgb(252, 201, 52)',
  'rgb(244, 81, 30)',
  'rgb(242, 153, 0)',
  'rgb(216, 27, 96)',
  'rgb(179, 157, 219)',
  'rgb(63, 81, 181)',
  'rgb(3, 155, 229)',
  'rgb(121, 85, 72)',
  'rgb(51, 182, 121)'
]

export const getRandomColor = string =>
  colors[
    Array.from(string)
      .map(c => c.charCodeAt(0))
      .reduce((a, b) => a + b, 0) % colors.length
  ]

export const addThreadUuidViewed = async uuid => {
  try {
    const { threadsUuidViewed } = await getBrowserStorage(
      'local',
      ['threadsUuidViewed'],
      [
        {
          key: 'threadsUuidViewed',
          defaultValue: []
        }
      ]
    )
    if (!threadsUuidViewed.includes(uuid)) {
      const newThreadsUuidViewed = [uuid, ...threadsUuidViewed]
      if (newThreadsUuidViewed.length > 500) {
        newThreadsUuidViewed.length = 500
      }
      await setBrowserStorage('local', {
        threadsUuidViewed: newThreadsUuidViewed
      })
    }
  } catch (error) {
    console.error(error)
  }
}
