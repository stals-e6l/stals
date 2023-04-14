import React from 'react'
import { render, screen } from '@testing-library/react'
import SamplePage from '.'

describe('SamplePage', () => {
  beforeEach(() => {
    render(<SamplePage />)
  })

  it('should render the SamplePage correctly', async () => {
    const page = await screen.findByTestId('SamplePage')

    expect(page).toBeInTheDocument()
  })
})
