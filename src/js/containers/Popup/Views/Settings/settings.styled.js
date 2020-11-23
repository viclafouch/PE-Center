import styled from 'styled-components'

const MyProfil = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing(2)}px;
  a {
    cursor: pointer;
    text-decoration: underline;
    color: inherit;
  }
`

export { MyProfil }
