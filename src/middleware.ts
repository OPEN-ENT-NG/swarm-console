import { withAuthProvider } from "./middlewares/withAuthorization";
import { withAuth } from "next-auth/middleware";
export default withAuthProvider("keycloak")

export const config = {
  matcher: ["/"],
};
