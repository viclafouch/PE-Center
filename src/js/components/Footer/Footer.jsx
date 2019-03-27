import React, { Component } from 'react'
import styled from 'styled-components'
import { PopupContext } from '@/js/stores/PopupContext'

const Container = styled.header`
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const SettingIcon = styled.div`
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.88;
  }
`

export class Footer extends Component {
  static contextType = PopupContext

  render() {
    const [{ theme }, dispatch] = this.context
    return (
      <Container>
        <SettingIcon
          onClick={() =>
            dispatch({
              type: 'changeTheme',
              newTheme: theme === 'dark' ? 'light' : 'dark'
            })
          }
        >
          <i className={`material-icons md-18 ${theme === 'dark' ? 'md-light' : 'md-dark'}`}>brightness_5</i>
        </SettingIcon>
        <SettingIcon>
          <i className={`material-icons md-18 ${theme === 'dark' ? 'md-light' : 'md-dark'}`}>settings</i>
        </SettingIcon>
      </Container>
    )
  }
}

export default Footer
