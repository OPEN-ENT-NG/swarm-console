import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import type { NextRequest } from "next/server";

import { authOptions } from "@/auth.config";

type NextAuthAppRouteHandler = (request: NextRequest) => Promise<Response>;

const createHandler = (options: NextAuthOptions): NextAuthAppRouteHandler => {
  return NextAuth(options) as unknown as NextAuthAppRouteHandler;
};

const handler = createHandler(authOptions);

export { handler as GET, handler as POST };
