import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/stores/store";
import type { Service } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER;
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  tagTypes: ["Services"],
  baseQuery,
  endpoints: builder => ({
    getServices: builder.query<Service[], void>({
      query: () => "/services",
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetServicesQuery } = api;
