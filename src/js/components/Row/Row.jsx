import React, { useState, memo } from 'react'
import { truncateAndReplace, getRandomColor } from '@utils/utils'
import { RowDescription } from '@styled'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import Icon from '@material-ui/core/Icon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { RowTitle } from '@styled/index'

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

const ProductAvatar = styled(Avatar)`
  && {
    width: 25px;
    height: 25px;
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    img {
      width: 17px;
      height: 17px;
    }
  }
`

function Row({ item = {}, type = 'card', srcAvatar, ...restProps }) {
  const [avatarColor] = useState(() => getRandomColor())
  return (
    <ListItem alignItems="center" onClick={() => restProps.onClick && restProps.onClick()} component="article">
      {type === 'thread' && (
        <UserAvatar style={{ backgroundColor: avatarColor }}>
          <Icon fontSize="small" color="action">
            person
          </Icon>
        </UserAvatar>
      )}
      {type === 'card' && srcAvatar && <ProductAvatar src={srcAvatar} alt={item.title} />}
      <ListItemText
        primary={
          <RowTitle
            variant="subtitle1"
            className={`title-row ${type === 'thread' ? 'title-thread' : 'title-card'}`}
            color="textPrimary"
          >
            {item.title}
          </RowTitle>
        }
        secondary={
          <RowDescription component="span" color="textPrimary">
            {truncateAndReplace(item.description)}
          </RowDescription>
        }
      />
    </ListItem>
  )
}

export default memo(Row)
