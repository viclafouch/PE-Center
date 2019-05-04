import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import { copy, TAILWIND_TYPE, HOS_TYPE } from '@utils/utils'
import { openLink } from '@utils/browser'
import { withTranslation } from 'react-i18next'

const Title = styled(Typography)`
  && {
    font-size: 14px;
  }
`

const StyledAvatar = styled(Avatar)`
  && {
    width: 30px;
    height: 30px;
    img {
      width: 20px;
      height: auto;
    }
  }
`

class SimpleDialog extends Component {
  copyLink(type) {
    const { cardSelected, close, enqueueSnackbar, t } = this.props
    if (copy(cardSelected.title, cardSelected.url, type)) {
      enqueueSnackbar(t('successCopy'), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        autoHideDuration: 2000
      })
      close()
    }
  }

  redirectionLink() {
    const { cardSelected, close } = this.props
    const url = new URL(cardSelected.url)
    url.searchParams.set('hl', cardSelected.lang)
    if (openLink(url.toString(), true)) close()
  }

  render() {
    const { open, cardSelected, close, afterExist, t } = this.props
    return (
      <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={open} onExited={afterExist}>
        <DialogTitle disableTypography style={{ padding: '16px 16px 10px' }}>
          <Title>{cardSelected.title}</Title>
        </DialogTitle>
        <div>
          <List>
            <ListItem button onClick={() => this.copyLink(HOS_TYPE)}>
              <ListItemAvatar>
                <StyledAvatar src="/images/Twitter.svg">
                  <AddIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText primary={t('copyHOS')} />
            </ListItem>
            <ListItem button onClick={() => this.copyLink(TAILWIND_TYPE)}>
              <ListItemAvatar>
                <StyledAvatar src="/images/google-g.svg">
                  <AddIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText primary={t('copyTailwind')} />
            </ListItem>
            <ListItem button onClick={() => this.redirectionLink()}>
              <ListItemAvatar>
                <StyledAvatar src={`/images/products/${cardSelected.getIcon}`}>
                  <AddIcon />
                </StyledAvatar>
              </ListItemAvatar>
              <ListItemText primary={t('learnMore')} />
            </ListItem>
          </List>
        </div>
      </Dialog>
    )
  }
}

export default withTranslation()(SimpleDialog)
