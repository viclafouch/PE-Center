import React from 'react'
import styled from 'styled-components'
import { openLink } from '@utils/browser'

const Error = styled.div`
  flex: 1;
  padding: 2px 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 0;
  justify-content: center;
  text-align: center;
  background-color: var(--primary-background-color);
  color: var(--primary-text-color);

  .link {
    text-decoration: underline;
    cursor: pointer;
  }

  h3 {
    color: red;
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 10px;
  }

  p {
    line-height: 1.255em;
  }
`

export default function FatalError() {
  const openIssue = () => openLink('https://github.com/viclafouch/PE-Center/issues/new/choose')
  return (
    <Error>
      <h3>An error happened</h3>
      <p>
        {' '}
        <span>
          An unknown error occurred. Please try to reinstall the extension. You can also{' '}
          <span role="link" tabIndex="0" className="link" onClick={openIssue} onKeyDown={openIssue}>
            contact the developer
          </span>
          .
        </span>
      </p>
    </Error>
  )
}
