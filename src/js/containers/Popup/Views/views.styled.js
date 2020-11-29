import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'

const View = styled(Container)`
  height: 100%;
  overflow-y: auto;
  position: relative;

  && {
    padding: 0;
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

  img {
    margin-bottom: ${props => props.theme.spacing(1)}px;
  }
`

const ViewBoxLoading = styled(Box)`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: ${props => props.theme.spacing(1)}px;
`

export { View, Intro, ViewBoxLoading }
