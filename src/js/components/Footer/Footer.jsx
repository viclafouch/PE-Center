import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AssignmentIcon from '@material-ui/icons/Assignment'
import RssFeedIcon from '@material-ui/icons/RssFeed'
import SettingsIcon from '@material-ui/icons/Settings'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  && {
    border-radius: 0;
  }
`

function Footer(props) {
  const { setTab, tab } = props
  return (
    <StyledPaper square>
      <Tabs
        value={tab}
        onChange={(event, val) => setTab(val)}
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
