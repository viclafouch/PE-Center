import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import {
  ANSWERS_VIEW,
  DARK_THEME,
  PRIVATE_ANSWER_LINK,
  PUBLIC_ANSWER_LINK,
  THREADS_VIEW
} from '@shared/constants'
import { handleAnchor } from '@utils/browser'

import { View } from '../views.styled'
import { MyProfil } from './settings.styled'

import { languages } from '@/js/i18n'
import {
  SET_LANG,
  SET_LIMIT_PER_PRODUCT,
  SET_OPEN_LINK_ANSWER_IN,
  SET_START_VIEW,
  TOGGLE_NOTIFICATIONS,
  TOGGLE_THEME
} from '@/js/stores/constants/index'
import { DefaultContext } from '@/js/stores/Default'
import { SettingsContext } from '@/js/stores/Settings'

const MenuPropsMaxHeightLang = {
  PaperProps: {
    style: {
      maxHeight: 150
    }
  }
}

function Settings() {
  const [settings, settingsDispatch] = useContext(SettingsContext)
  const [defaultState, defaultDispatch] = useContext(DefaultContext)
  const { t } = useTranslation()

  const handleSwitchTheme = () => {
    settingsDispatch({
      type: TOGGLE_THEME
    })
  }

  const handleSwitchNotifications = () => {
    defaultDispatch({
      type: TOGGLE_NOTIFICATIONS
    })
  }

  const handleChangeSettings = (type, payload) => {
    settingsDispatch({
      type,
      payload
    })
  }

  return (
    <View>
      <form noValidate id="settings-form">
        <FormControl fullWidth required>
          <InputLabel id="demo-mutiple-chip-label">{t('products')}</InputLabel>
          <Select multiple></Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <FormGroup>
            <FormControlLabel
              data-switch-theme
              control={
                <Switch
                  checked={settings.theme === DARK_THEME}
                  onChange={handleSwitchTheme}
                  value="theme"
                />
              }
              label={t('darkMode')}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth required>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={defaultState.enableNotifications}
                  onChange={handleSwitchNotifications}
                  value="notifications"
                />
              }
              label={t('notifications')}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="lang">{t('language')}</InputLabel>
          <Select
            MenuProps={MenuPropsMaxHeightLang}
            value={settings.lang}
            onChange={event =>
              handleChangeSettings(SET_LANG, { lang: event.target.value })
            }
          >
            {Object.keys(languages).map(langKey => (
              <MenuItem key={langKey} value={langKey} component="li">
                {languages[langKey]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="limit-threads">{t('limitThread')}</InputLabel>
          <Select
            value={settings.limitThreadsPerProduct}
            onChange={event =>
              handleChangeSettings(SET_LIMIT_PER_PRODUCT, {
                limitThreadsPerProduct: parseInt(event.target.value, 10)
              })
            }
            input={<Input id="limit-threads" />}
          >
            <MenuItem value={10} component="li">
              10
            </MenuItem>
            <MenuItem value={25} component="li">
              25
            </MenuItem>
            <MenuItem value={50} component="li">
              50
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="open-in">{t('openIn')}</InputLabel>
          <Select
            value={settings.openLinkAnswerIn}
            onChange={event =>
              handleChangeSettings(SET_OPEN_LINK_ANSWER_IN, {
                openLinkAnswerIn: event.target.value
              })
            }
            input={<Input id="open-in" />}
          >
            <MenuItem value={PUBLIC_ANSWER_LINK} component="li">
              PUBLIC_ANSWER_LINK
            </MenuItem>
            <MenuItem value={PRIVATE_ANSWER_LINK} component="li">
              {t('communityConsole')}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required margin="dense">
          <InputLabel htmlFor="start-page">{t('launchPage')}</InputLabel>
          <Select
            value={settings.startView}
            input={<Input id="start-page" />}
            onChange={event =>
              handleChangeSettings(SET_START_VIEW, {
                startView: event.target.value
              })
            }
            renderValue={() =>
              settings.startView === ANSWERS_VIEW
                ? t('searchHelpPage')
                : t('newPostsPage')
            }
          >
            <MenuItem value={ANSWERS_VIEW} component="li">
              {t('searchHelpPage')}
            </MenuItem>
            <MenuItem value={THREADS_VIEW} component="li">
              {t('newPostsPage')}
            </MenuItem>
          </Select>
        </FormControl>
      </form>
      <MyProfil>
        <Typography component="p" variant="body2">
          Coded by{' '}
          <a
            href="https://twitter.com/TrustedSheriff"
            target="_blank"
            rel="noreferrer"
            onClick={handleAnchor}
          >
            Victor de la Fouchardiere
          </a>
          <br />
          <a
            href="https://github.com/viclafouch/PE-Center"
            target="_blank"
            rel="noreferrer"
            onClick={handleAnchor}
          >
            Open source project
          </a>
        </Typography>
      </MyProfil>
    </View>
  )
}

export default Settings
