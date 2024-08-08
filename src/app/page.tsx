import { Metadata } from "next";

import { ServiceList } from "@/components/ServicesList";
import { TabList } from "@/components/TabList";
import { METATITLE } from "@/core/const";

export const metadata: Metadata = {
  title: `${METATITLE}`,
};

export default function Home() {
  return (
    <main>
      <TabList />
      <ServiceList />
    </main>
  );
}
