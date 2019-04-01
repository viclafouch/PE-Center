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
import { SELECT_PRODUCTS } from '@/js/stores/reducer/constants'

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
  const [{ productsSelected }, dispatch] = useSettings()
  const [theme, setTheme] = useTheme()
  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await getAllProducts()
      setProducts(response.result)
    })()
  }, [])

  return (
    <div className="main-content">
      <Form>
        <FormControl fullWidth margin="dense" required>
          <InputLabel htmlFor="select-multiple-checkbox">Products</InputLabel>
          <Select
            multiple
            value={productsSelected.map(e => e.id)}
            onChange={({ target }) => {
              dispatch({
                type: SELECT_PRODUCTS,
                productsSelected: target.value.map(e => products.find(p => p.id === e))
              })
            }}
            input={<Input id="select-multiple-checkbox" />}
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
            label="Dark mode"
          />
        </FormGroup>
      </Form>
    </div>
  )
}

export default Settings
