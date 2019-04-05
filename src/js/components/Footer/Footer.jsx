import React, { useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AssignmentIcon from '@material-ui/icons/Assignment'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'
import { DefaultContext } from '@/js/stores/DefaultContext'
import { CHANGE_TAB } from '@/js/stores/reducer/constants'

const StyledPaper = styled(Paper)`
  && {
    border-radius: 0;
  }
`

function Footer() {
  const [{ currentTab }, dispatch] = useContext(DefaultContext)
  return (
    <StyledPaper square>
      <Tabs
        value={currentTab}
        onChange={(event, val) =>
          dispatch({
            type: CHANGE_TAB,
            currentTab: val
          })
        }
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<AssignmentIcon />} />
        <Tab icon={<RssFeedIcon />} />
        <Tab icon={<SettingsIcon />} />
      </Tabs>
    </StyledPaper>
  )
}

export default Footer
