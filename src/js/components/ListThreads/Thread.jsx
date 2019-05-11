import React, { memo, useState, useCallback } from 'react'
import { getRandomColor, truncateAndReplace } from '@utils/utils'
import { Description } from '@styled'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import { getBrowserStorage, setBrowserStorage, openLink } from '@utils/browser'

const StyledListItem = styled(ListItem)`
  &&:hover {
    opacity: 0.475;
    cursor: pointer;
  }

  &[data-readed='true'] {
    opacity: 0.4;
  }

  &[data-readed='false'] .title-thread {
    font-weight: 500;
  }

  .title-thread {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  }
`

const UserAvatar = styled(Avatar)`
  && {
    width: 20px;
    height: 20px;
    span {
      font-size: 14px;
      color: #ffffff;
    }
  }
`

export function Thread({ uuid, readed, title, description, url }) {
  const [isRead, setIsRead] = useState(readed)
  const [avatarColor] = useState(() => getRandomColor())

  const handleSelect = useCallback(async () => {
    if (isRead) return
    try {
      setIsRead(true)
      const { threadsUuidReaded } = await getBrowserStorage('local')
      threadsUuidReaded.push(uuid)
      await setBrowserStorage('local', { threadsUuidReaded })
    } catch (error) {
      console.error(error)
    } finally {
      openLink(url)
    }
  }, [isRead, uuid, url])

  return (
    <StyledListItem alignItems="center" data-readed={isRead === true} onClick={handleSelect}>
      <UserAvatar style={{ backgroundColor: avatarColor }}>
        <Icon fontSize="small" color="action">
          person
        </Icon>
      </UserAvatar>
      <ListItemText
        primary={
          <Typography component="span" className="title-thread" color="textPrimary">
            {title}
          </Typography>
        }
        secondary={
          <Description component="span" color="textPrimary">
            {truncateAndReplace(description)}
          </Description>
        }
      />
    </StyledListItem>
  )
}

export default memo(Thread)
