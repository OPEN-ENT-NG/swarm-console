import type { FunctionComponent } from 'react'

type UsernameProps = {
  name: string
}

export const Username: FunctionComponent<UsernameProps> = ({ name }) => (
  <span data-testid="username-component">{name}</span>
)
