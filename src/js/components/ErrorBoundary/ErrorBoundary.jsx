import React, { Component } from 'react'
import { Button, Typography } from '@material-ui/core'
import { HARD_RELOAD } from '@shared/constants'
import {
  clearStorage,
  handleAnchor,
  sendMessageToBackground
} from '@utils/browser'
import PropTypes from 'prop-types'

import { ErrorIdStyled, FatalErrorStyled } from './error.styled'

export class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
      eventId: '',
      errorInfo: ''
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  async hardReload() {
    await clearStorage('local')
    await clearStorage('sync')
    await sendMessageToBackground(HARD_RELOAD)
    window.location.reload()
  }

  render() {
    const { hasError, eventId } = this.state
    const { children } = this.props

    if (hasError)
      return (
        <FatalErrorStyled>
          <Typography variant="h5" color="error" gutterBottom>
            An error happened :(
          </Typography>
          <Typography gutterBottom>
            An unknown error occurred. Please try to{' '}
            <a
              href="https://chrome.google.com/webstore/detail/pe-center/hanknpkmjbfhcalmipokkfplndkohgdm"
              target="_blank"
              rel="noreferrer"
              onClick={handleAnchor}
            >
              reinstall the extension
            </a>
            . You can also{' '}
            <a
              href="https://github.com/viclafouch/PE-Center/issues/new/choose"
              target="_blank"
              rel="noreferrer"
              onClick={handleAnchor}
            >
              contact the developer
            </a>
            .
          </Typography>
          <Button
            onClick={this.hardReload}
            color="primary"
            size="small"
            variant="contained"
          >
            Clear cache
          </Button>
          <ErrorIdStyled variant="caption">{eventId}</ErrorIdStyled>
        </FatalErrorStyled>
      )
    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default ErrorBoundary
