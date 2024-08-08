"use client";

import { FC } from "react";

import { useGlobalProvider } from "@/providers/GlobalProvider";

export const ServiceList: FC = () => {
  const { services } = useGlobalProvider();

  return (
    <ul data-testid="service-list-component">{services?.map(service => <li key={service.id}>{service.name}</li>)}</ul>
  );
};
