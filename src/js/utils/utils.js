const isDev = process.env.NODE_ENV === 'development'

export const debug = str => isDev && console.log(`%c ${str}`, 'color: yellow; font-weight: bold')

export const wait = (timeout = 500) => new Promise(resolve => setTimeout(resolve, timeout))
