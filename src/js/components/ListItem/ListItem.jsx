import React, { memo, useState } from 'react'
import Icon from '@material-ui/core/Icon'
import MuiListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import { getRandomColor, truncateAndReplace } from '@utils'
import PropTypes from 'prop-types'

import {
  BadgeNonIssue,
  BadgeValid,
  BadgeViewed,
  BoxBadges,
  Description,
  ProductAvatar,
  styles,
  Title,
  UserAvatar
} from './list-item.styled'

function ListItem({
  title,
  img,
  description,
  item,
  onClick,
  transparent,
  ...restProps
}) {
  const [avatarColor] = useState(() => getRandomColor(title))

  const handleClick = event => {
    event.preventDefault()
    onClick(item)
  }

  const hasBadges =
    item.hasRecommendedAnswer || item.hasReply || item.isNonIssue

  return (
    <MuiListItem
      alignItems="center"
      data-transparent={transparent}
      onClick={handleClick}
      {...restProps}
    >
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
        disableTypography
        primary={
          <Title variant="subtitle1" color="textPrimary">
            {title}
          </Title>
        }
        secondary={
          <>
            <Description component="span" color="textPrimary">
              {truncateAndReplace(description)}
            </Description>
            {hasBadges && (
              <BoxBadges>
                {item.hasRecommendedAnswer && (
                  <Tooltip title="TODO" enterDelay={500} placement="top">
                    <BadgeValid fontSize="small" />
                  </Tooltip>
                )}
                {item.hasReply && (
                  <Tooltip title="TODO" enterDelay={500} placement="top">
                    <BadgeViewed fontSize="small" />
                  </Tooltip>
                )}
                {item.isNonIssue && (
                  <Tooltip title="TODO" enterDelay={500} placement="top">
                    <BadgeNonIssue fontSize="small" />
                  </Tooltip>
                )}
              </BoxBadges>
            )}
          </>
        }
      />
    </MuiListItem>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  transparent: PropTypes.bool
}

ListItem.defaultProps = {
  title: '',
  description: '',
  img: '',
  transparent: false
}

export default memo(withStyles(styles)(ListItem))
