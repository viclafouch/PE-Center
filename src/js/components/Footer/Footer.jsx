import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import AssignmentIcon from '@material-ui/icons/Assignment'
import SettingsIcon from '@material-ui/icons/Settings'
import { ANSWERS_VIEW, SETTINGS_VIEW, THREADS_VIEW } from '@shared/constants'
import PropTypes from 'prop-types'

import { StyledPaper } from './footer.styled'

function a11yProps(index, ariaLabel) {
  return {
    id: `tab-${index}`,
    'arial-label': ariaLabel
  }
}

function Footer({ setCurrentView, currentView }) {
  return (
    <StyledPaper square>
      <Tabs
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        value={currentView}
        onChange={(event, value) => setCurrentView(value)}
        aria-label="scrollable force tabs example"
      >
        <Tab
          value={ANSWERS_VIEW}
          icon={<AssignmentIcon />}
          {...a11yProps(0, 'Tab 1')}
        />
        {/* <Tab
          value={THREADS_VIEW}
          icon={<RssFeedIcon />}
          {...a11yProps(1, 'Tab 2')}
        /> */}
        <Tab
          value={SETTINGS_VIEW}
          icon={<SettingsIcon />}
          {...a11yProps(2, 'Tab 3')}
        />
      </Tabs>
    </StyledPaper>
  )
}

Footer.propTypes = {
  setCurrentView: PropTypes.func.isRequired,
  currentView: PropTypes.oneOf([ANSWERS_VIEW, THREADS_VIEW, SETTINGS_VIEW])
    .isRequired
}

export default Footer
