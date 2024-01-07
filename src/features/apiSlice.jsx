import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ApiSlice = createApi({
  reducerPath: 'ApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({}),
  });

