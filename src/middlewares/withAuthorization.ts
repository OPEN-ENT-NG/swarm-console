import { getToken } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";
import type { NextAuthMiddlewareOptions, NextMiddlewareWithAuth, WithAuthArgs } from "next-auth/middleware";
import type { BuiltInProviderType, RedirectableProviderType } from "next-auth/providers/index";
import type { LiteralUnion } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextMiddleware, NextRequest } from "next/server";

// async function hash(value: string): Promise<string> {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(value);
//   const hash = await crypto.subtle.digest("SHA-256", data);
//   const hashArray = Array.from(new Uint8Array(hash));
//   return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
// }

interface AuthMiddlewareOptions extends NextAuthMiddlewareOptions {
  trustHost?: boolean;
}

function getHost(req: NextRequest): string {
  console.log(
    "MY HOST TO REQUEST:",
    process.env.NEXTAUTH_URL ?? req.headers?.get("x-forwarded-host") ?? "http://localhost:3000",
  );
  return process.env.NEXTAUTH_URL ?? req.headers?.get("x-forwarded-host") ?? "http://localhost:3000";
}

type CsrfInfo = {
  csrfToken: string;
  setCookies: string[];
};
export async function getCsrfInfo(req: NextRequest): Promise<CsrfInfo | null> {
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
    console.log("fetching csrfToken Data: ", data.csrfToken);
    response.headers.getSetCookie();
    return {
      csrfToken: data.csrfToken,
      setCookies: response.headers.getSetCookie(),
    };
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}

async function handleMiddleware(
  req: NextRequest,
  options: (AuthMiddlewareOptions & { provider?: string }) | undefined = {},
  onSuccess?: (token: JWT | null) => ReturnType<NextMiddleware>,
) {
  console.log("--- handleMiddleware start ---");
  console.log("Request URL:", req.url);
  console.log("Request method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers));
  console.log("Request cookies:", req.cookies.getAll());
  console.log("Cookies setter:", req.cookies.toString());

  const { origin, basePath } = req.nextUrl;
  console.log("Origin:", origin);
  console.log("Base path:", basePath);

  const errorPage = options?.pages?.error ?? "/api/auth/error";
  console.log("Error page:", errorPage);

  options.trustHost ??= !!(process.env.NEXTAUTH_URL ?? process.env.AUTH_TRUST_HOST);
  console.log("Trust host:", options.trustHost);

  console.log("Host:", `${getHost(req)}`);

  options.secret ??= process.env.NEXTAUTH_SECRET;
  if (!options.secret) {
    console.error(`[next-auth][error][NO_SECRET]`, `\nhttps://next-auth.js.org/errors#no_secret`);

    const errorUrl = new URL(`${basePath}${errorPage}`, origin);
    errorUrl.searchParams.append("error", "Configuration");

    console.log("Redirecting to error page:", errorUrl.toString());
    return NextResponse.redirect(errorUrl);
  }

  console.log("Getting token...");
  const token = await getToken({
    req,
    decode: options.jwt?.decode,
    cookieName: options?.cookies?.sessionToken?.name,
    secret: options.secret,
  });
  console.log("Token:", token ? "Token received" : "No token");

  console.log("Checking authorization...");
  const isAuthorized = (await options?.callbacks?.authorized?.({ req, token })) ?? !!token;
  console.log("Is authorized:", isAuthorized);

  if (isAuthorized) {
    console.log("User is authorized, calling onSuccess");
    return onSuccess?.(token);
  }

  console.log("User is not authorized, proceeding with authentication");

  const cookieCsrfToken = req.cookies.get("next-auth.csrf-token")?.value;
  console.log("CSRF token from cookie:", cookieCsrfToken);

  // const csrfToken = cookieCsrfToken?.split("|")?.[0] ?? "";
  const csrfInfo = ((await getCsrfInfo(req)) as CsrfInfo) ?? "";

  // const csrfTokenHash = cookieCsrfToken?.split("|")?.[1] ?? (await hash(`${csrfToken}${options.secret}`));
  // const cookie = `${csrfToken}|${csrfTokenHash}`;
  // console.log("Generated CSRF token cookie:", cookie);

  try {
    const signinUrl = `${getHost(req)}/api/auth/signin/${options.provider ?? ""}`;
    console.log("Signin URL:", signinUrl);

    // const isSecure = getHost(req).startsWith("https://") ?? false;
    // const cookieName = isSecure
    //   ? "__Host-next-auth.csrf-token"
    //   : "next-auth.csrf-token";

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Auth-Return-Redirect": "1",
      cookie: `${csrfInfo.setCookies.toString()}`,
    };
    console.log("Request headers:", headers);

    const body = new URLSearchParams({
      csrfToken: csrfInfo.csrfToken,
      callbackUrl: req.nextUrl.pathname,
      json: "true",
    });
    console.log("Request body:", body.toString());

    console.log("Sending signin request...");
    const res = await fetch(signinUrl, {
      method: "POST",
      headers,
      redirect: "follow",
      body,
    });

    console.log("Signin response status:", res.status);
    console.log("Signin response headers:", Object.fromEntries(res.headers));
    console.log("Signin response cookies:", res.headers.getSetCookie());

    const data = (await res.json()) as { url: string };
    console.log("Signin response data:", data);

    console.log("Redirecting to:", data.url);
    return NextResponse.redirect(data.url, {
      headers: {
        "Set-Cookie": res.headers.get("set-cookie") ?? "",
      },
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }

  console.log("--- handleMiddleware end ---");
}

export declare type WithAuthProviderArgs = [
  ...(WithAuthArgs &
    [
      {
        provider: LiteralUnion<RedirectableProviderType | BuiltInProviderType>;
      },
    ]),
];

export function withAuth(...args: WithAuthProviderArgs) {
  if (!args.length || args[0] instanceof Request) {
    console.log("withAuth: Direct middleware call");
    return handleMiddleware(...(args as Parameters<typeof handleMiddleware>));
  }

  if (typeof args[0] === "function") {
    console.log("withAuth: Function middleware");
    const middleware = args[0] as NextMiddlewareWithAuth;
    const options = args[1] as NextAuthMiddlewareOptions | undefined;
    return async (...args: Parameters<NextMiddlewareWithAuth>) => {
      console.log("withAuth: Executing function middleware");
      return await handleMiddleware(args[0], options, async token => {
        console.log("withAuth: Token received, calling custom middleware");
        args[0].nextauth = { token };
        return await middleware(...args);
      });
    };
  }

  console.log("withAuth: Options middleware");
  const options: AuthMiddlewareOptions = args[0] as AuthMiddlewareOptions;
  return async (...args: Parameters<NextMiddleware>) => {
    console.log("withAuth: Executing options middleware");
    return await handleMiddleware(args[0], options);
  };
}

export function withAuthProvider(
  provider: LiteralUnion<RedirectableProviderType | BuiltInProviderType>,
  ...args: WithAuthArgs
) {
  console.log("withAuthProvider: Called with provider", provider);
  return withAuth({ ...args, provider });
}
