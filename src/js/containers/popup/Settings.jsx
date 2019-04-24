import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import { getAllProducts } from '@shared/api/Product.api'
import useTheme from '@shared/hooks/useTheme'
import { useSettings } from '@/js/stores/SettingsContext'
import { SELECT_PRODUCTS, SWITCH_LANGUAGE } from '@/js/stores/reducer/constants'
import { useTranslation } from 'react-i18next'
import { languages, getBrowserStorage, setBrowserStorage } from '@utils/browser'

const Form = styled.form`
  padding: 12px 15px;
`

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 150
    }
  }
}

function Settings() {
  const { t } = useTranslation()
  const [{ productsSelected, lang }, dispatch] = useSettings()
  const [theme, setTheme] = useTheme()
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const localStorage = await getBrowserStorage('local')
      setProducts(localStorage.products)
      try {
        const response = await getAllProducts()
        if (response.count > 0 && localStorage.products.length === response.count) return
        setBrowserStorage('local', { products: response.result })
      } catch (error) {
        if (!localStorage.products.length) {
          console.log('nooo products')
        }
      }
    })()
  }, [])

  return (
    <div className="main-content">
      <Form>
        <FormControl fullWidth margin="dense" required>
          <InputLabel htmlFor="select-products">{t('products')}</InputLabel>
          <Select
            multiple
            value={productsSelected.map(e => e.id)}
            onChange={({ target }) => {
              dispatch({
                type: SELECT_PRODUCTS,
                productsSelected: target.value.map(e => products.find(p => p.id === e))
              })
            }}
            input={<Input id="select-products" />}
            renderValue={() => productsSelected.map(e => e.name).join(', ')}
            MenuProps={MenuProps}
          >
            {products.map(product => (
              <MenuItem key={product.id} value={product.id} disableGutters component="li" style={{ padding: `4px 0` }}>
                <Checkbox checked={productsSelected.some(e => e.id === product.id)} />
                <ListItemText primary={product.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            data-switch-theme
            control={<Switch checked={theme === 'dark'} onChange={e => setTheme(e.target.checked)} value="darkMode" />}
            label={t('darkMode')}
          />
        </FormGroup>
        <FormControl fullWidth margin="dense" required>
          <InputLabel htmlFor="select-lang">Language</InputLabel>
          <Select
            value={lang}
            onChange={({ target }) => {
              dispatch({
                type: SWITCH_LANGUAGE,
                lang: target.value
              })
            }}
            input={<Input id="select-lang" />}
            renderValue={() => languages[lang]}
            MenuProps={MenuProps}
          >
            {Object.keys(languages).map(langKey => (
              <MenuItem key={langKey} value={langKey} component="li">
                {languages[langKey]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Form>
    </div>
  )
}

export default Settings
