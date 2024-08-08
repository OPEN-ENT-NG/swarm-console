import { HttpResponse, http } from "msw";

import { servicesMock } from "../components/ServicesList/__tests__/mocks/servicesMock";

export const handlers = [
  http.get("http://localhost:8080/api/services", () => {
    console.log('Captured a GET "/services" request');
    console.log(HttpResponse.json(servicesMock));
    return HttpResponse.json(servicesMock);
  }),
];
