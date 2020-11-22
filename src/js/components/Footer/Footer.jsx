import React, { useContext } from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AssignmentIcon from '@material-ui/icons/Assignment'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import SettingsIcon from '@material-ui/icons/Settings'
import { SET_CURRENT_VIEW } from '@stores/constants/index'
import { DefaultContext } from '@stores/Default'

import { StyledPaper } from './footer.styled'

function a11yProps(index, ariaLabel) {
  return {
    id: `tab-${index}`,
    'arial-label': ariaLabel
  }
}

function Footer() {
  const [{ currentView }, dispatch] = useContext(DefaultContext)

  const handleChangeTab = (event, value) => {
    dispatch({
      type: SET_CURRENT_VIEW,
      payload: {
        currentView: value
      }
    })
  }

  return (
    <StyledPaper square>
      <Tabs
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        value={currentView}
        onChange={handleChangeTab}
        aria-label="scrollable force tabs example"
      >
        <Tab icon={<AssignmentIcon />} {...a11yProps(0, 'Tab 1')} />
        <Tab icon={<RssFeedIcon />} {...a11yProps(1, 'Tab 2')} />
        <Tab icon={<SettingsIcon />} {...a11yProps(2, 'Tab 3')} />
      </Tabs>
    </StyledPaper>
  )
}

Footer.propTypes = {}

export default Footer
