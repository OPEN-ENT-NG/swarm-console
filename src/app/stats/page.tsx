import { Metadata } from "next";

import { HomePage } from "@/containers/HomePage";
import { METATITLE } from "@/core/const";

export const metadata: Metadata = {
  title: `${METATITLE}`,
};

export default function Stats() {
  return <HomePage />;
}
