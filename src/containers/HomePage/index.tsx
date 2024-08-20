"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { useGlobalProvider } from "@/providers/GlobalProvider";

import { MainView } from "../MainView";
import { NoServicesView } from "../NoServicesView";
import * as ST from "./style";
import { headerImages } from "./utils";

export const HomePage: FC = () => {
  const { services } = useGlobalProvider();
  const { t } = useTranslation();

  return (
    <>
      <Header items={headerImages} />
      <ST.MainWrapper>
        <Title text={t("swarm.title")} />
        {services?.length ? <MainView /> : <NoServicesView />}
      </ST.MainWrapper>
    </>
  );
};