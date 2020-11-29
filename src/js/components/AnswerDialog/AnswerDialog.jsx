import React from 'react'
import { useTranslation } from 'react-i18next'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'

import { AvatarStyled } from './answer-dialog.styled'

function AnswerDialog({ title, productLogo, ...restProps }) {
  const { t } = useTranslation()

  return (
    <Dialog {...restProps}>
      <DialogTitle disableTypography>
        <Typography variant="body1" component="h3">
          {title}
        </Typography>
      </DialogTitle>
      <List>
        <ListItem button>
          <ListItemAvatar>
            <AvatarStyled src="/images/twitter-logo.svg">
              <AddIcon />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={t('copyHOS')} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <AvatarStyled src="/images/google-logo.svg">
              <AddIcon />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={t('copyTailwind')} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <AvatarStyled src={productLogo}>
              <AddIcon />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={t('learnMore')} />
        </ListItem>
      </List>
    </Dialog>
  )
}

AnswerDialog.propTypes = {
  title: PropTypes.string.isRequired,
  productLogo: PropTypes.string.isRequired
}

export default AnswerDialog
