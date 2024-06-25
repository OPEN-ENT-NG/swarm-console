import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <main>Ferme wordpress: console de gestion</main>
    );
  } else {
    return <main>
      <p>Non authentifié</p>
    </main>
  }
}
