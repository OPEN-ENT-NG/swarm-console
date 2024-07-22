import { getServerSession } from "next-auth";

import { authOptions } from "@/auth.config";
import UserService from "@/services/user.service";
import { Username } from "@/components/username";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    const me = await UserService.me();
    return (
      <div>
        <main>Ferme wordpress: console de gestion. Bonjour <Username name={me.name} /></main>
      </div>
    );
  } else {
    return <main>
      <p>Non authentifié</p>
    </main>
  }
}
