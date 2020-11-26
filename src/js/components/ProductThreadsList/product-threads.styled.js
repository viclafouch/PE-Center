import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const ListSubheaderStyled = styled(ListSubheader)`
  background-color: ${props => props.theme.palette.background.paper};
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 40px;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.palette.divider};
`

const ListStyled = styled(List)`
  padding: 0;
  background-color: ${props => props.theme.palette.background.default};
`

const AvatarProduct = styled(Avatar)`
  && {
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
    width: 20px;
    height: 20px;
    padding: 5px;
  }
`

const ProductName = styled(Typography)`
  && {
    line-height: 40px;
    color: ${props => props.theme.palette.text.primary};
  }
`

export { ListSubheaderStyled, ListStyled, AvatarProduct, ProductName }
