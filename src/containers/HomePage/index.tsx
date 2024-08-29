"use client";

import { Button } from "@mui/material";
import { FC } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

import { Header } from "@/components/Header";
import { Title } from "@/components/Title";
import { useGlobalProvider } from "@/providers/GlobalProvider";

import { MainView } from "../MainView";
import { NoServicesView } from "../NoServicesView";
import { MainWrapper } from "./style";
import { headerImages } from "./utils";

interface AbsoluteButtonProps {
  onClick: () => void;
}

const AbsoluteButton: FC<AbsoluteButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      Add Services
    </Button>
  );
};

export const HomePage: FC = () => {
  const { services, handleSwitchServices } = useGlobalProvider();
  const { t } = useTranslation();
console.log(services);

  return (
    <>
      <Header items={headerImages} />
      <AbsoluteButton onClick={handleSwitchServices} />
      <MainWrapper>
        <Title text={t("swarm.title")} />
        {services?.length ? <MainView /> : <NoServicesView />}
      </MainWrapper>
    </>
  );
};