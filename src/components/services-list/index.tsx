import type { FunctionComponent } from "react";

import type { Service } from '@/types'

type ServiceListProps = {
  services: Service[]
}

export const ServiceList: FunctionComponent<ServiceListProps> = ({ services }) => (
  <ul data-testid="service-list-component">
    {
      services.map(service => <li key={service.id}>{service.name}</li>)
    }
  </ul>
)
