import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import styled from 'styled-components'

const ListSubheaderStyled = styled(ListSubheader)`
  background-color: ${props => props.theme.palette.background.paper};
`

const ListStyled = styled(List)`
  padding: 0;
  background-color: ${props => props.theme.palette.background.default};
`

export { ListSubheaderStyled, ListStyled }
