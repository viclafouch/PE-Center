import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  padding: 10px;
  left: 0;
  right: 0;
  top: 0;
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);
`

export class Settings extends Component {
  render() {
    return (
      <Modal>
        <h2>Settings</h2>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Modal>
    )
  }
}

export default Settings
