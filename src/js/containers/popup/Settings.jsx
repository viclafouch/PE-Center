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
import { useSettings } from '../../stores/SettingsContext'
import { SWITCH_THEME } from '../../stores/reducer/constants'

const Form = styled.form`
  padding: 12px 15px;
`

const useTheme = () => {
  const [{ theme }, dispatch] = useSettings()

  const setTheme = value => {
    dispatch({
      type: SWITCH_THEME,
      theme: value === true ? 'dark' : 'light'
    })
  }

  return [theme, setTheme]
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 150
    }
  }
}

function Settings() {
  const [productsSelected, setProductsSelected] = useState([])
  const [theme, setTheme] = useTheme()
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await getAllProducts()
      const productsMaped = response.result.map(e => e.name)
      setProducts(productsMaped)
    })()
  }, [])

  return (
    <div className="main-content">
      <Form>
        <FormControl fullWidth margin="dense" required>
          <InputLabel htmlFor="select-multiple-checkbox">Products</InputLabel>
          <Select
            multiple
            value={productsSelected}
            onChange={e => setProductsSelected(e.target.value)}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {products.map(product => (
              <MenuItem key={product} value={product} disableGutters component="li" style={{ padding: `4px 0` }}>
                <Checkbox />
                <ListItemText primary={product} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            data-switch-theme
            control={<Switch checked={theme === 'dark'} onChange={e => setTheme(e.target.checked)} value="darkMode" />}
            label="Dark mode"
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default Settings
