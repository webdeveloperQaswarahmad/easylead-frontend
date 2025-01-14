import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = async (args, api, extraOptions) => {
  try {
    const result = await fetchBaseQuery({ baseUrl: API_URI + "/api" })(
      args,
      api,
      extraOptions
    );
    return result;
  } catch (error) {
    throw error;
  }
};

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
