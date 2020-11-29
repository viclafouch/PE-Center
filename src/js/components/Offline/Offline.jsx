import React from 'react'
import { useTranslation } from 'react-i18next'
import { Intro } from '@containers/Popup/Views/views.styled'
import Typography from '@material-ui/core/Typography'

function Offline() {
  const { t } = useTranslation()

  return (
    <Intro>
      <img src="/images/offline.svg" alt="Offline" width="160" height="130" />
      <Typography component="h1" variant="h6" color="error">
        {t('error.offline.title')}
      </Typography>
      <Typography component="p" variant="body2">
        {t('error.offline.description')}
      </Typography>
    </Intro>
  )
}

export default Offline
