import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'

const View = styled(Container)`
  height: 100%;
  overflow-y: auto;
  position: relative;

  && {
    display: flex;
    flex-direction: column;
  }
`

const Intro = styled.div`
  && {
    padding: ${props => props.theme.spacing(1, 1)};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`

const ViewBoxLoading = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing(1)}px;
`

export { View, Intro, ViewBoxLoading }
