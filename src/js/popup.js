import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'
import ReactDOM from 'react-dom'
import SearchCards from '@containers/SearchCards'

const GlobalStyle = createGlobalStyle`
  body {
    width: 300px;
    padding: 10px;
    height: 500px;
    background-color: #202124;
    margin: 0;
    box-sizing: border-box;

    * {
      box-sizing: border-box;
    }
  }
`

class Popup extends Component {
  render() {
    return (
      <React.Fragment>
        <SearchCards />
        <GlobalStyle />
      </React.Fragment>
    )
  }
}

ReactDOM.render(<Popup />, document.getElementById('popup'))
