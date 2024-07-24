import { getServerSession } from "next-auth";

import { authOptions } from "@/auth.config";
import ServicesService from "@/services/services.service";
import { ServiceList } from "@/components/services-list";

export default async function Home() {
  const session = await getServerSession(authOptions)
  if (session) {
    const services = await ServicesService.list();
    return (
      <div>
        <main>
          Ferme wordpress: console de gestion.
          <ServiceList services={services} />
        </main>
      </div>
    );
  } else {
    return <main>
      <p>Non authentifié</p>
    </main>
  }
}
