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

const InputBaseStyled = styled(InputBase)`
  && {
    margin-left: 8px;
    flex: 1;
  }
`

export { InputBaseStyled, PaperStyled }
