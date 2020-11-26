import List from '@material-ui/core/List'
import styled from 'styled-components'

const Block = styled.div`
  display: inline-block;
  width: 100%;
  text-align: center;
  margin: ${props => props.theme.spacing(2, 0)};
`

const ThreadsList = styled(List)`
  && {
    width: 100%;
    background-color: ${props => props.theme.palette.background.paper};
    position: relative;
    overflow: auto;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const ThreadsListItem = styled.li`
  && {
    background-color: ${props => props.theme.palette.background.paper};
  }
`

export { Block, ThreadsList, ThreadsListItem }
