import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export class Popup extends Component {
  state = {
    test: 'ok'
  }

  render() {
    const { test } = this.state
    return <div>{test}</div>
  }
}

ReactDOM.render(<Popup />, document.getElementById('popup'))
