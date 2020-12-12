import { Typography } from '@material-ui/core'
import styled from 'styled-components'

const FatalErrorStyled = styled.div`
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

  button {
    margin-top: 30px;
  }

  a {
    text-decoration: underline;
    color: #6699f3;
    cursor: pointer;
  }
`

const ErrorIdStyled = styled(Typography)`
  margin-top: 10px;
`

export { FatalErrorStyled, ErrorIdStyled }
