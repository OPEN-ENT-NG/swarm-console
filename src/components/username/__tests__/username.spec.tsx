import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { Username } from '@/components/username'

describe('Username component', () => {
  render(<Username name='John DOE' />)
  const component = screen.getByTestId("username-component")

  it('renders without crashing', () => {
    expect(component).toBeInTheDocument()
  })

  it('renders the username', () => {
    expect(component.textContent).toBe('John DOE')
  })
})
