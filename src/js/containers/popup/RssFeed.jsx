import React from 'react'
import Typography from '@material-ui/core/Typography'
import { IllusTab } from '@containers/PopupContainer'
import { useTranslation } from 'react-i18next'

export function RssFeed() {
  const { t } = useTranslation()
  return (
    <div className="main-content">
      <IllusTab>
        <img src="/images/undraw_Outer_space_drqu.svg" alt="RSS Feed" />
        <Typography component="h1" variant="h6">
          {t('feedTitle')}
        </Typography>
        <Typography component="p" variant="body2" style={{ lineHeight: 1.1, fontWeight: 'normal' }}>
          {t('feedIntro')}
        </Typography>
      </IllusTab>
    </div>
  )
}

export default RssFeed
