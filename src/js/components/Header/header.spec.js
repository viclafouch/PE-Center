import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Header from './Header'

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header />)
    const inputNode = screen.getByLabelText('search')
    fireEvent.change(inputNode, { target: { value: '2020-05-12' } })
  })
})
