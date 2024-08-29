import { Metadata } from "next";

import { HomePage } from "@/containers/HomePage";
import { METATITLE } from "@/core/const";
import { signIn } from "next-auth/react"

export const metadata: Metadata = {
  title: `${METATITLE}`,
};

export default function Home() {
  return <HomePage />;
}

export default () => (
  <button onClick={() => signIn("google")}>Sign in with Google</button>
)
