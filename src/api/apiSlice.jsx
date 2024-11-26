import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Posts'], 
  endpoints: (builder) => ({
    // Fetch posts
    fetchPosts: builder.query({
      // query: () => 'posts', 
      query: (endpoint) => endpoint, 
      providesTags: ['Posts'], 
    }),
    // Perform create, update, delete
    dynamicMutation: builder.mutation({
      query: ({ endpoint, method, body }) => ({
        url: endpoint,
        method,
        body,
      }),
      invalidatesTags: ['Posts'], 
    }),
  }),
});

export const { useFetchPostsQuery, useDynamicMutationMutation } = apiSlice;





// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
//   endpoints: (builder) => ({
//     getItems: builder.query({
//       query: () => '/items',
//     }),
//   }),
// });

// export const { useGetItemsQuery } = apiSlice;
