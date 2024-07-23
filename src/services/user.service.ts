import { getServerSession } from "next-auth"

import { authOptions } from "@/auth.config"

import type { User } from '@/types'

const me = async (): Promise<User> => {
  const session: any = await getServerSession(authOptions)
  console.log(session.token)
  const res = await fetch(`${process.env.API_SERVER}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.token}`
    }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch user data. Status = ${res.status} - ${res.statusText}`)
  }

  return res.json()
}

export default {
  me
}
