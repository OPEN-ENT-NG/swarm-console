import { getServerSession } from "next-auth"

import { authOptions } from "@/auth.config"

import type { Service } from '@/types'

const list = async (): Promise<Service[]> => {

  //TODO Créer un wrapper qui fait cela
  const session: any = await getServerSession(authOptions)
  const res = await fetch(`${process.env.API_SERVER}/services`, {
    headers: {
      Authorization: `Bearer ${session.token}`
    }
  })
  if (!res.ok) {
    throw new Error(`Failed to fetch services list. Status = ${res.status} - ${res.statusText}`)
  }

  return res.json()
}

export default {
  list
}
