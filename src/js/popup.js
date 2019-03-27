import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchCards from '@containers/SearchCards'
import Footer from '@components/Footer/Footer'
import { getBrowserStorage } from '@utils/browser'
import { PopupStore } from './stores/PopupContext'

class Popup extends Component {
  render() {
    const { storage } = this.props
    return (
      <React.Fragment>
        <PopupStore initialState={storage}>
          <>
            <SearchCards />
            <Footer />
          </>
        </PopupStore>
      </React.Fragment>
    )
  }
}

window.onload = async () => {
  try {
    const browserStorages = await Promise.all([getBrowserStorage('local'), getBrowserStorage('sync')])
    const storage = browserStorages.reduce((a, d) => Object.assign(d, a), {})
    ReactDOM.render(<Popup storage={storage} />, document.getElementById('popup'))
  } catch (error) {
    console.warn(error)
  }
}
