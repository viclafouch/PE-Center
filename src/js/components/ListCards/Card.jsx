import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

function truncateAndReplace(str = '', maxLength = 130) {
  let text = str.replace(/&nbsp;/gi, ' ')
  if (text.length > maxLength) text = `${text.slice(0, maxLength)}...`
  return text
}

const StyledAvatar = styled(Avatar)`
  && {
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    img {
      width: 20px;
      height: auto;
    }
  }
`

const Description = styled(Typography)`
  && {
    display: -webkit-box;
    font-size: 11px;
    margin-top: 3px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`
const Title = styled(Typography)`
  && {
    font-size: 14px;
    line-height: 1.1em;
  }
`

function CardItem({ title, description }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <StyledAvatar alt={title} sizes="24" src="/images/youtube-64.png" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Title gutterBottom variant="subtitle1">
            {title}
          </Title>
        }
        secondary={
          <Description component="span" color="textPrimary">
            {truncateAndReplace(description)}
          </Description>
        }
      />
    </ListItem>
  )
}

export default CardItem
