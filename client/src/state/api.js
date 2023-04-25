import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "DeleteUser",
    "Transactions",
    "DeleteTransaction",
    "Geography",
    "Sales",
    "Admins",
    "UserPerformance",
    "Dashboard"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,
      providesTags: ["Products"],
    }),
    getCustomer: build.query({
      query: () => `client/customers`,
      providesTags: ["Customers"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `client/delete-customer/${id}`,
        method: "DELETE",
        providesTags: ["DeleteUser"],
      }),
      invalidatesTags: ["Customers"], // dùng invalidate để fetch getCustomers
    }),
    getTransaction: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transaction",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `client/delete-transaction/${id}`,
        method: "DELETE",
        providesTags: ["DeleteTransaction"],
      }),
      invalidatesTags: ["Transactions"], // dùng invalidate để fetch getCustomers
    }),
    getGeography: build.query({
      query: () => ({
        url: "client/get-geography",
        method: "GET",
      }),
      providesTags: ["Geography"],
    }),
    getSale: build.query({
      query: () => ({
        url: "sales/get-sale",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => `management/admins`,
      providesTags: ["Admins"],
    }),
    getPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["UserPerformance"],
    }),
    getDashboard: build.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomerQuery,
  useDeleteUserMutation,
  useGetTransactionQuery,
  useDeleteTransactionMutation,
  useGetGeographyQuery,
  useGetSaleQuery,
  useGetAdminsQuery,
  useGetPerformanceQuery,
  useGetDashboardQuery
} = api;
