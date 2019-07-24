import React, { useContext } from 'react'
import Drawer from '@material-ui/core/Drawer'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from '@/js/stores/SettingsContext'
import { TOGGLE_SIDEBAR, SELECT_PRODUCTS, CHANGE_TAB } from '@/js/stores/reducer/constants'
import { DefaultContext } from '@/js/stores/DefaultContext'

const ToolbarClosed = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 52px;
`

const SidebarBody = styled.div`
  min-width: 160px;
  text-align: center;
`

function Sidebar() {
  const { t } = useTranslation()
  const [{ isOpenSidebar }, dispatchDefault] = useContext(DefaultContext)
  const [{ productsSelected }, dispatchSettings] = useContext(SettingsContext)

  const closeSidebar = () =>
    dispatchDefault({
      type: TOGGLE_SIDEBAR,
      isOpenSidebar: false
    })

  const handleFilter = productId => {
    const newProductsSelected = [...productsSelected]
    const productIndex = newProductsSelected.findIndex(p => p.id === productId)
    const product = { ...newProductsSelected[productIndex], visible: !newProductsSelected[productIndex].visible }
    newProductsSelected[productIndex] = product
    dispatchSettings({
      type: SELECT_PRODUCTS,
      productsSelected: newProductsSelected
    })
  }

  return (
    <ClickAwayListener onClickAway={closeSidebar} mouseEvent={isOpenSidebar ? 'onClick' : false}>
      <Drawer variant="persistent" anchor="left" open={isOpenSidebar}>
        <ToolbarClosed>
          <IconButton onClick={closeSidebar}>
            <ChevronLeftIcon />
          </IconButton>
        </ToolbarClosed>
        <Divider />
        <Typography component="p" variant="body2" style={{ padding: 10 }}>
          {t('filteredProducts')}
        </Typography>
        <SidebarBody>
          <FormGroup>
            {productsSelected.map(product => (
              <FormControlLabel
                style={{ padding: '0 10px' }}
                key={product.id}
                control={<Checkbox checked={product.visible} onChange={() => handleFilter(product.id)} />}
                label={product.name}
              />
            ))}
          </FormGroup>
          {productsSelected.length === 0 && (
            <Icon
              fontSize="large"
              color="action"
              onClick={() => {
                dispatchDefault({ type: CHANGE_TAB, currentTab: 2 })
                closeSidebar()
              }}
              style={{ margin: '0 auto', cursor: 'pointer' }}
            >
              add_circle
            </Icon>
          )}
        </SidebarBody>
      </Drawer>
    </ClickAwayListener>
  )
}

export default Sidebar
