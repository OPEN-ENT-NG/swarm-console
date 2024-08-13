import { HttpResponse, http } from "msw";

import { Service } from "@/types";

import { servicesMock } from "./mocks/servicesMock";

type MocksConfig = {
  services?: Service[];
};

const defaultMocks: MocksConfig = {
  services: servicesMock,
};

export const createHandlers = (customMocks: Partial<MocksConfig> = {}) => {
  const mocks: MocksConfig = { ...defaultMocks, ...customMocks };

  return [
    http.get("http://localhost:8080/api/services", () => {
      console.log('Captured a GET "/services" request');
      console.log(HttpResponse.json(mocks.services));
      return HttpResponse.json(mocks.services);
    }),
  ];
};

export const handlers = createHandlers();
