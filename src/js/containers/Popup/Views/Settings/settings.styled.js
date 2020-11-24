import styled from 'styled-components'

const FormStyled = styled.form`
  padding: ${props => props.theme.spacing(1, 0)};
`

const MyProfil = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing(2, 2)};
  a {
    cursor: pointer;
    text-decoration: underline;
    color: inherit;
  }
`

export { MyProfil, FormStyled }
