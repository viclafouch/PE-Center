import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { IllusTab } from '@containers/PopupContainer'

export class RssFeed extends Component {
  render() {
    return (
      <div className="main-content">
        <IllusTab>
          <img src="/images/undraw_Outer_space_drqu.svg" alt="RSS Feed" />
          <Typography component="h1" variant="h6">
            RSS feed
          </Typography>
          <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae.
          </Typography>
        </IllusTab>
      </div>
    )
  }
}

export default RssFeed
