import { withAuthProvider } from "./middlewares/withAuthorization";
import { withAuth } from "next-auth/middleware";
export default withAuthProvider("keycloak");

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/"],
};
