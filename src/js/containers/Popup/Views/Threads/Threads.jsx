import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'

import { Intro, View } from '../views.styled'

function Threads() {
  const { t } = useTranslation()

  return (
    <View className="hide-scrollbar">
      <Intro>
        <img
          src="/images/space-ship.svg"
          alt="Browse threads"
          width="160"
          height="130"
        />
        <Typography component="h1" variant="h6">
          {t('feedTitle')}
        </Typography>
        <Typography component="p" variant="body2">
          {t('feedIntro')}
        </Typography>
      </Intro>
    </View>
  )
}

export default Threads
