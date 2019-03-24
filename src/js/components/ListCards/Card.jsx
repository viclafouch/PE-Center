import React from 'react'
import styled from 'styled-components'

const Card = styled.article`
  width: 100%;
  padding: 10px 0;
  color: white;
  line-height: 1.05em;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    opacity: 0.8;
  }
`

const Title = styled.h4`
  font-size: 14px;
  line-height: 1.1em;
  color: white;
`
const Type = styled.span`
  color: #9aa0a6;
  overflow: hidden;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.38);
  display: -webkit-box;
  font-size: 11px;
  margin-top: 3px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

function truncateAndReplace(str, maxLength = 130) {
  let text = str.replace(/&nbsp;/gi, ' ')
  if (text.length > maxLength) text = `${text.slice(0, maxLength)}...`
  return text
}

function CardItem({ url, title, description }) {
  return (
    <Card>
      <a href={url}>
        <Title>{title}</Title>
        <Type>Help article - YouTube</Type>
        <Subtitle>{truncateAndReplace(description)}</Subtitle>
      </a>
    </Card>
  )
}

export default CardItem
