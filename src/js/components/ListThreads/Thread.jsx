import React, { memo, useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { getBrowserStorage, setBrowserStorage, openLink } from '@utils/browser'
import Row from '@components/Row/Row'
import { SettingsContext } from '@/js/stores/SettingsContext'

const Readed = styled.div`
  opacity: ${props => (props.readed ? '0.475!important' : 1)};
  &&:hover {
    opacity: 0.675;
    cursor: pointer;
  }
  .title-thread.title-thread {
    font-weight: ${props => (props.readed ? '500' : '400')};
  }
`

export function Thread(thread) {
  const [isRead, setIsRead] = useState(thread.readed)
  const [{ openLinkIn }] = useContext(SettingsContext)

  const handleSelect = useCallback(async () => {
    if (isRead) return
    try {
      setIsRead(true)
      const { threadsUuidReaded } = await getBrowserStorage('local')
      threadsUuidReaded.push(thread.uuid)
      await setBrowserStorage('local', { threadsUuidReaded })
    } catch (error) {
      console.error(error)
    } finally {
      openLink(openLinkIn === 'public' ? thread.publicUrl : thread.consoleUrl, false)
    }
  }, [isRead, openLinkIn, thread.consoleUrl, thread.publicUrl, thread.uuid])

  return (
    <Readed readed={isRead}>
      <Row type="thread" item={thread} onClick={handleSelect} />
    </Readed>
  )
}

export default memo(Thread)
