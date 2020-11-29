import Avatar from '@material-ui/core/Avatar'
import styled from 'styled-components'

const AvatarStyled = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
    img {
      width: 20px;
      height: auto;
    }
  }
`

export { AvatarStyled }
