import React,  { Component }  from 'react'
import ReactDOM from 'react-dom'
export class Popup extends Component {
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}


ReactDOM.render(<Popup />, document.getElementById('popup'))