import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const RowDescription = styled(Typography)`
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

export const RowTitle = styled(Typography)`
  && {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    display: inline-block;
  }
`

export const Intro = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 24px;

  img {
    margin-bottom: 12px;
    height: 130px;
  }
`
