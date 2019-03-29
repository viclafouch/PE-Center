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
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
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
