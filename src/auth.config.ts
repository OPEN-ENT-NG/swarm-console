import KeycloakProvider from 'next-auth/providers/keycloak'

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || '',
      clientSecret: process.env.KEYCLOAK_SECRET || '',
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && account.access_token) {
        token.accessToken = account.access_token
        token.id = profile.id
      }

      return token
    },
    session: async ({ session, token, user }: any) => {
      // If we want to make the accessToken available in components, then we have to explicitly forward it here.
      return { ...session, token: token.accessToken }
    },
  }
}
