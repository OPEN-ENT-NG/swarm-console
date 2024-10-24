import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { InputValueState as CreateBody } from "@/containers/CreateServicesModal/types";
import { Services } from "@/providers/GlobalProvider/serviceType";
import { TableQueryParamsState } from "@/providers/GlobalProvider/types";
import { RootState } from "@/stores/store";

import {
  DeleteBody,
  DistributeBody,
  ResetBody,
  ServiceStatsRaw,
  ToggleStatusBody,
  UpdateBody,
  UsersData,
} from "./types";

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
  tagTypes: ["Services", "Users", "Stats"],
  baseQuery,
  endpoints: builder => ({
    getServices: builder.query<Services, TableQueryParamsState>({
      query: params => {
        const queryParams = new URLSearchParams();

        queryParams.append("page", (params.page + 1).toString());
        queryParams.append("limit", params.limit.toString());
        queryParams.append("order", params.order);

        if (params.search) queryParams.append("search", params.search);
        if (params.types && params.types.length > 0) {
          params.types.forEach(type => queryParams.append("types", type));
        }
        if (params.structures && params.structures.length > 0) {
          params.structures.forEach(structure => queryParams.append("structures", structure));
        }
        if (params.classes && params.classes.length > 0) {
          params.classes.forEach(classe => queryParams.append("classes", classe));
        }
        if (params.groups && params.groups.length > 0) {
          params.groups.forEach(group => queryParams.append("groups", group));
        }
        return {
          url: `/services?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Services"],
    }),
    getUsers: builder.query<UsersData, void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getStats: builder.query<ServiceStatsRaw, void>({
      query: () => "/statistics",
      providesTags: ["Stats"],
    }),
    createServices: builder.mutation<void, CreateBody>({
      query: body => ({
        url: "/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services", "Stats"],
    }),
    deleteServices: builder.mutation<void, DeleteBody>({
      query: body => ({
        url: "/services",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Services", "Stats"],
    }),
    distributeServices: builder.mutation<void, DistributeBody>({
      query: body => ({
        url: "/services/emails",
        method: "POST",
        body,
      }),
    }),
    updateServices: builder.mutation<void, UpdateBody>({
      query: body => ({
        url: "/services",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services", "Stats"],
    }),
    resetServices: builder.mutation<void, ResetBody>({
      query: body => ({
        url: "/services/reset",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Services", "Stats"],
    }),
    toggleServices: builder.mutation<void, ToggleStatusBody>({
      query: body => ({
        url: "/services",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Services", "Stats"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetUsersQuery,
  useGetStatsQuery,
  useCreateServicesMutation,
  useDeleteServicesMutation,
  useDistributeServicesMutation,
  useResetServicesMutation,
  useUpdateServicesMutation,
  useToggleServicesMutation,
} = api;
