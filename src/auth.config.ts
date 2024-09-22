import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    id_token: string;
    expires_at: number;
    refresh_token: string;
    error?: string;
    roles: string[];
  }
}

declare module 'jwt-decode' {
  export interface JwtPayload {
    realm_access: { roles: string[] };
  }
}

declare module 'next-auth' {
  interface Session {
    error?: string;
    roles: string[];
    sub?: string;
  }
}

type RefreshToken = {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
}

type RefreshAccessToken = {
  access_token: string;
  id_token: string;
  expires_at: number;
  refresh_token: string;
} & JWT

const COOKIES_LIFE_TIME = 24 * 60 * 60;
const COOKIE_PREFIX = process.env.NODE_ENV === 'production' ? '__Secure-' : '';

const refreshAccessToken = async (token: JWT): Promise<RefreshAccessToken> => {
  const url = `${process.env.KEYCLOACK_ISSUER}/protocol/openid-connect/token`;
  const resp = await fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOACK_CLIENT_ID || "",
      client_secret: process.env.KEYCLOACK_CLIENT_SECRET || "",
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
    }),
    method: 'POST',
  });
  const refreshToken = (await resp.json()) as RefreshToken;
  if (!resp.ok) throw refreshToken;

  const tokenData = jwtDecode(refreshToken.access_token);

  return {
    ...token,
    access_token: refreshToken.access_token,
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
    roles: tokenData.realm_access.roles,
  };
};

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID || "",
      clientSecret: process.env.KEYCLOAK_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
      checks: "none"
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger }) {
      const nowTimeStamp = dayjs();

      try {
        // we refresh token on update action
        if (trigger === 'update') {
          return await refreshAccessToken(token);
        }

        // we get intial token on sign in
        if (
          account &&
          account.access_token &&
          account.id_token &&
          account.expires_at &&
          account.refresh_token
        ) {
          const tokenData = jwtDecode(account.access_token);

          token.roles = tokenData.realm_access.roles;
          token.access_token = account.access_token;
          token.id_token = account.id_token;
          token.expires_at = account.expires_at;
          token.refresh_token = account.refresh_token;
          return token;
          // if time of expires is more then current date then we return existing token.
        } else if (
          token &&
          nowTimeStamp.isBefore(dayjs.unix(token.expires_at))
        ) {
          return token;
          // this happens after user session is expired, so in this case we try to update user session
        } else {
          return await refreshAccessToken(token);
        }
        // if session update is failed we return error and on client we are doing logout(TokenExpireController).
      } catch (error) {
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },
    session({ session, token }) {
      return { ...session, ...token, token: token.access_token  };
    },
  },
  events: {
    async signOut({ token }) {
      const logOutUrl = new URL(
        `${process.env.KEYCLOACK_ISSUER}/protocol/openid-connect/logout`,
      );
      logOutUrl.searchParams.set('id_token_hint', token.id_token!);
      await fetch(logOutUrl);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIE_PREFIX}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    state: {
      name: `${COOKIE_PREFIX}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    nonce: {
      name: `${COOKIE_PREFIX}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};