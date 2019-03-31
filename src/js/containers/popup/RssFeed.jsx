import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
`

const Illustration = styled.img`
  max-width: 100%;
  width: 100px;
  height: auto;
`

export class RssFeed extends Component {
  render() {
    return (
      <Container className="main-content">
        <div>
          <Illustration src="/images/rss-in-dev.png" alt="RSS Feed" />
          <Typography component="h1" variant="h6">
            RSS feed
          </Typography>
          <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae.
          </Typography>
        </div>
      </Container>
    )
  }
}

export default RssFeed
