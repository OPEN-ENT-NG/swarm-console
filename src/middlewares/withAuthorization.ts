import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import type { NextAuthMiddlewareOptions, NextMiddlewareWithAuth, WithAuthArgs } from "next-auth/middleware";
import type { BuiltInProviderType, RedirectableProviderType } from "next-auth/providers/index";
import type { LiteralUnion } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextMiddleware, NextRequest } from "next/server";

interface AuthMiddlewareOptions extends NextAuthMiddlewareOptions {
  trustHost?: boolean;
}

const getHost = (req: NextRequest): string => {
  return process.env.NEXTAUTH_URL ?? req.headers?.get("x-forwarded-host") ?? "http://localhost:3000";
};

type CsrfInfo = {
  csrfToken: string;
  setCookies: string[];
};
export const getCsrfInfo = async (req: NextRequest): Promise<CsrfInfo | null> => {
  try {
    const response = await fetch(`${getHost(req)}/api/auth/csrf`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = (await response.json()) as { csrfToken: string };
    response.headers.getSetCookie();
    return {
      csrfToken: data.csrfToken,
      setCookies: response.headers.getSetCookie(),
    };
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

const handleMiddleware = async (
  req: NextRequest,
  options: (AuthMiddlewareOptions & { provider?: string }) | undefined = {},
  onSuccess?: (token: JWT | null) => ReturnType<NextMiddleware>,
) => {
  const { origin, basePath } = req.nextUrl;

  const errorPage = options?.pages?.error ?? "/api/auth/error";

  options.trustHost ??= !!(process.env.NEXTAUTH_URL ?? process.env.AUTH_TRUST_HOST);

  options.secret ??= process.env.NEXTAUTH_SECRET;
  if (!options.secret) {
    const errorUrl = new URL(`${basePath}${errorPage}`, origin);
    errorUrl.searchParams.append("error", "Configuration");
    return NextResponse.redirect(errorUrl);
  }

  const token = await getToken({
    req,
    decode: options.jwt?.decode,
    cookieName: options?.cookies?.sessionToken?.name,
    secret: options.secret,
  });

  const isAuthorized = (await options?.callbacks?.authorized?.({ req, token })) ?? !!token;

  if (isAuthorized) {
    return onSuccess?.(token);
  }
  const csrfInfo = ((await getCsrfInfo(req)) as CsrfInfo) ?? "";

  try {
    const signinUrl = `${getHost(req)}/api/auth/signin/${options.provider ?? ""}`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1",
      cookie: `${csrfInfo.setCookies.toString()}`,
    };
    const body = new URLSearchParams({
      csrfToken: csrfInfo.csrfToken,
      callbackUrl: req.nextUrl.pathname,
      json: "true",
    });
    const res = await fetch(signinUrl, {
      method: "POST",
      headers,
      redirect: "follow",
      body,
    });
    const data = (await res.json()) as { url: string };
    return NextResponse.redirect(data.url, {
      headers: {
        "Set-Cookie": res.headers.get("set-cookie") ?? "",
      },
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export declare type WithAuthProviderArgs = [
  ...(WithAuthArgs &
    [
      {
        provider: LiteralUnion<RedirectableProviderType | BuiltInProviderType>;
      },
    ]),
];

export const withAuth = (...args: WithAuthProviderArgs) => {
  if (!args.length || args[0] instanceof Request) {
    return handleMiddleware(...(args as Parameters<typeof handleMiddleware>));
  }

  if (typeof args[0] === "function") {
    const middleware = args[0] as NextMiddlewareWithAuth;
    const options = args[1] as NextAuthMiddlewareOptions | undefined;
    return async (...args: Parameters<NextMiddlewareWithAuth>) => {
      return await handleMiddleware(args[0], options, async token => {
        args[0].nextauth = { token };
        return await middleware(...args);
      });
    };
  }

  const options: AuthMiddlewareOptions = args[0] as AuthMiddlewareOptions;
  return async (...args: Parameters<NextMiddleware>) => {
    return await handleMiddleware(args[0], options);
  };
};

export const withAuthProvider = (
  provider: LiteralUnion<RedirectableProviderType | BuiltInProviderType>,
  ...args: WithAuthArgs
) => {
  return withAuth({ ...args, provider });
};
