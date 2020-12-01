import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const UserAvatar = styled(Avatar)`
  && {
    width: 25px;
    height: 25px;
    span {
      font-size: 14px;
      color: #ffffff;
    }
  }
`

const Description = styled(Typography)`
  && {
    display: -webkit-box;
    font-size: 11px;
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 16px; /* fallback */
    max-height: 32px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`

const Title = styled(Typography)`
  && {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  }
`

const ProductAvatar = styled(Avatar)`
  && {
    width: 25px;
    height: 25px;
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15);
    img {
      width: 17px;
      height: 17px;
    }
  }
`

const styles = {
  root: {
    opacity: props => (props.transparent ? '0.4' : '1')
  }
}

export { UserAvatar, ProductAvatar, Description, Title, styles }
