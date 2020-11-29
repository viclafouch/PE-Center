import Box from '@material-ui/core/Box'
import styled from 'styled-components'

const BlockBottom = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing(1)}px;
`

const NoResultBox = styled(Box)`
  padding: ${props => props.theme.spacing(1, 2)};
  text-align: center;
`

export { BlockBottom, NoResultBox }
