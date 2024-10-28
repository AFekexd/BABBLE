import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  deleteCredentials,
  setCredentials,
} from "../../features/auth/authSlice";
import { decrypt } from "../../util/encrypt";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    //@ts-ignore
    const token = decrypt(getState().user.jwt);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Access-Control-Allow-Origin", "true");
      headers.set("Access-Control-Allow-Credentials", "true");
    }
    return headers;
  },
});

const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = (await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    )) as any;
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult?.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(deleteCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRetry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
