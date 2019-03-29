import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PhoneIcon from '@material-ui/icons/Phone'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PersonPinIcon from '@material-ui/icons/PersonPin'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  && {
    border-radius: 0;
  }
`

function Footer() {
  const [value, setValue] = useState(0)
  return (
    <StyledPaper square>
      <Tabs
        value={value}
        onChange={(event, val) => setValue(val)}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<PhoneIcon />} />
        <Tab icon={<FavoriteIcon />} />
        <Tab icon={<PersonPinIcon />} />
      </Tabs>
    </StyledPaper>
  )
}

export default Footer
