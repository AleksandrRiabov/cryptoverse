import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
	'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f6e85a3537msh16a1b454499b4afp16528ejsn68b2051e2547'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
	reducerPat: "cryptoApi",
	baseQuery: fetchBaseQuery({baseUrl}),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createRequest(`/coins?limit=${count}`)
		}),
		getCryptosDetails: builder.query({
			query: (coinId) => createRequest(`/coin/${coinId}`)
		}),
		getCryptosHistory: builder.query({
			query: ({coinId, timePeriod} ) => createRequest(`/coin/${coinId}/history?referenceCurrencyUui=yhjMzLPhuIDl&timePeriod=${timePeriod}`)
		}),
		getCryptosExchanges: builder.query({
			query: () => createRequest('/exchanges'),
		}),
	})
})

export const {
	useGetCryptosQuery, 
	useGetCryptosDetailsQuery,
	useGetCryptosHistoryQuery,
	useGetCryptosExchangesQuery,
} = cryptoApi;

