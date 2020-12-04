import Avatar from '@material-ui/core/Avatar'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

const PaperStyled = styled(Paper)`
  && {
    padding: 2px 4px;
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 0;
    z-index: 99;
    flex-shrink: 0;
  }
`

const LogoStyled = styled(Avatar)`
  width: ${props => props.theme.spacing(3)}px;
  height: ${props => props.theme.spacing(3)}px;
  margin-left: ${props => props.theme.spacing(1)}px;
  margin-right: ${props => props.theme.spacing(2)}px;
`

const InputBaseStyled = styled(InputBase)`
  && {
    margin-left: 8px;
    flex: 1;
  }
`

export { InputBaseStyled, PaperStyled, LogoStyled }
