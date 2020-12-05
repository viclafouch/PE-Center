import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const AvatarStyled = styled(Avatar)`
  && {
    width: ${props => props.theme.spacing(3)}px;
    height: ${props => props.theme.spacing(3)}px;
  }
`

const TitleAnswerStyled = styled(Typography)`
  && {
    font-size: 1.05rem;
    font-weight: 500;
    line-height: 1.6;
  }
`

const ProductLogoStyled = styled.img`
  && {
    width: ${props => props.theme.spacing(5)}px;
    height: ${props => props.theme.spacing(5)}px;
    margin-bottom: ${props => props.theme.spacing(1)}px;
    text-align: center;
  }
`

export { AvatarStyled, ProductLogoStyled, TitleAnswerStyled }
