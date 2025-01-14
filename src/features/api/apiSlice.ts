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
    }),
    getMatch: builder.query({
      // since there can only be one match as per server.js, currently hard-coding to 1
      query: () => "/matches/1",
    }),
    updateMatch: builder.mutation({
      // since there can only be one match as per server.js, currently hard-coding to 1
      query: (ballDetails) => ({
        url: "/matches/1/score",
        method: 'PUT',
        body: ballDetails,
      }),
    }),
  }),
})

export const { useGetTeamsQuery, useAddMatchMutation, useGetMatchQuery, useUpdateMatchMutation } = crickerScorerApi