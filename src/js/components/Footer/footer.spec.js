import React from 'react'
import { render } from '@testing-library/react'

import Footer from './Footer'

import { DefaultProvider } from '@/js/stores/Default'

describe('<Footer />', () => {
  test('renders Footer component', () => {
    render(
      <DefaultProvider>
        <Footer />
      </DefaultProvider>
    )
  })
})
