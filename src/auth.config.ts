import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID ?? "",
      clientSecret: process.env.KEYCLOAK_SECRET ?? "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      // If we want to make the accessToken available in components, then we have to explicitly forward it here.
      return { ...session, token: token.accessToken };
    },
  },
};
