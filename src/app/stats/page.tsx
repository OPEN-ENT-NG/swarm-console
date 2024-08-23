import { Metadata } from "next";

import { HomePage } from "@/containers/HomePage";
import { METATITLE_STATS } from "@/core/const";

export const metadata: Metadata = {
  title: `${METATITLE_STATS}`,
};

export default function Stats() {
  return <HomePage />;
}
