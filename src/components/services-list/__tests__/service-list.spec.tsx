import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { ServiceList } from '@/components/services-list'
import { Service } from '@/types'

const services: Service[] = [
  {
    id: 1,
    name: 'wordpress'
  },
  {
    id: 2,
    name: 'prestashop'
  }
]

describe('ServiceList component', () => {
  render(<ServiceList services={services} />)
  const component = screen.getByTestId("service-list-component")

  it('renders without crashing', () => {
    expect(component).toBeInTheDocument()
  })

  it('renders 2 services', () => {
    expect(component.children.length).toEqual(2)
  })

})
