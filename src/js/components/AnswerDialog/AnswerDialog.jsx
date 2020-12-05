import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import StarsIcon from '@material-ui/icons/Stars'
import { copyAsHyperlink, getAnswerUrl } from '@utils'
import { openLink } from '@utils/browser'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import {
  AvatarStyled,
  ProductLogoStyled,
  TitleAnswerStyled
} from './answer-dialog.styled'

function AnswerDialog({ answer, product, lang, onClose, ...restProps }) {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const url = useMemo(
    () =>
      getAnswerUrl({
        type: answer.type,
        lang: lang,
        productCode: product.code,
        answerUuid: answer.uuid
      }),
    [answer.uuid, answer.type, lang, product.code]
  )

  const handleOpenLink = () => {
    openLink(url, '_blank')
  }

  const handleCopyLink = () => {
    const hasCopied = copyAsHyperlink(answer.title, url)
    if (hasCopied) {
      enqueueSnackbar(t('successCopy'), {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        autoHideDuration: 2000
      })
      onClose()
    } else {
      enqueueSnackbar(t('error.unknown'), {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        autoHideDuration: 2000
      })
    }
  }

  return (
    <Dialog {...restProps} onClose={onClose}>
      <DialogTitle disableTypography>
        <Box display="flex" justifyContent="center">
          <ProductLogoStyled src={product.logo} alt={answer.title} />
        </Box>
        <TitleAnswerStyled variant="h6" component="h3" align="center">
          {answer.title}
        </TitleAnswerStyled>
      </DialogTitle>
      <List>
        <ListItem button onClick={handleOpenLink}>
          <ListItemAvatar>
            <AvatarStyled>
              <OpenInNewIcon fontSize="small" />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={t('Ouvrir le lien')} />
        </ListItem>
        <ListItem button onClick={handleCopyLink}>
          <ListItemAvatar>
            <AvatarStyled>
              <FileCopyIcon fontSize="small" />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={'Copier le lien hypertexte'} />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <AvatarStyled>
              <StarsIcon fontSize="small" />
            </AvatarStyled>
          </ListItemAvatar>
          <ListItemText primary={t('Ajouter à mes favoris')} />
        </ListItem>
      </List>
    </Dialog>
  )
}

AnswerDialog.propTypes = {
  answer: PropTypes.object,
  product: PropTypes.object,
  lang: PropTypes.string.isRequired
}

AnswerDialog.defaultProps = {
  answer: {},
  product: {}
}

export default AnswerDialog
