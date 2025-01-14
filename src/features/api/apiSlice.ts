import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Match } from '../../types/match'


export const crickerScorerApi = createApi({
  reducerPath: 'cricker-scorer-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => "/teams",
    }),
    addMatch: builder.mutation({
      query: (match: Match) => ({
        url: "matches",
        method: 'post',
        body: match,
      }),
      
    })
  }),
})

export const { useGetTeamsQuery, useAddMatchMutation } = crickerScorerApi