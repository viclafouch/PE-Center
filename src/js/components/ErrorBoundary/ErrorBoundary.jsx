import React, { Component } from 'react'
import FatalError from '@components/FatalError/FatalError'

export class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return <FatalError />
    }

    return children
  }
}

export default ErrorBoundary
