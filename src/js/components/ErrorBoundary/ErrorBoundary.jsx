import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import { handleAnchor } from '@utils/browser'
import PropTypes from 'prop-types'

import { FatalErrorStyled } from './error.styled'

export class ErrorBoundary extends Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError)
      return (
        <FatalErrorStyled>
          <Typography variant="h5" color="error" gutterBottom>
            An error happened :(
          </Typography>
          <Typography>
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
