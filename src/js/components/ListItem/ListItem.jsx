import React, { useState } from 'react'
import Icon from '@material-ui/core/Icon'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { getRandomColor, truncateAndReplace } from '@utils'

import {
  Description,
  ProductAvatar,
  Title,
  UserAvatar
} from './list-item.styled'

function ListItem({ title, img, description, ...restProps }) {
  const [avatarColor] = useState(() => getRandomColor(title))

  return (
    <MuiListItem alignItems="center" {...restProps}>
      <ListItemAvatar>
        {img ? (
          <ProductAvatar src={img} alt={title} />
        ) : (
          <UserAvatar style={{ backgroundColor: avatarColor }}>
            <Icon fontSize="small" color="action">
              person
            </Icon>
          </UserAvatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Title variant="subtitle1" color="textPrimary">
            {title}
          </Title>
        }
        secondary={
          <Description component="span" color="textPrimary">
            {truncateAndReplace(description)}
          </Description>
        }
      />
    </MuiListItem>
  )
}

export default ListItem
