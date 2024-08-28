import { withAuthProvider } from "./middlewares/withAuthorization";
export default withAuthProvider("keycloak")

export const config = {
  matcher: ["/", "/(.*)"],
};
