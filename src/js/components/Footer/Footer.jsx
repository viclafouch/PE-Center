import React, { useContext } from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AssignmentIcon from '@material-ui/icons/Assignment'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import SettingsIcon from '@material-ui/icons/Settings'

import { SET_CURRENT_VIEW } from '../../stores/constants'
import { StyledPaper } from './footer.styled'

import { DefaultContext } from '@/js/stores/Default'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
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
        <Tab icon={<AssignmentIcon />} {...a11yProps(0)} />
        <Tab icon={<RssFeedIcon />} {...a11yProps(0)} />
        <Tab icon={<SettingsIcon />} {...a11yProps(0)} />
      </Tabs>
    </StyledPaper>
  )
}

Footer.propTypes = {}

export default Footer
