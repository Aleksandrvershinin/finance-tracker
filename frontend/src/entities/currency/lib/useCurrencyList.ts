import { useQuery } from "@tanstack/react-query"
import { currencyApi } from "../api/currency.api"


export const useCurrencyList = () => {
    return useQuery({
        ...currencyApi.getCurrencyListQueryOptions(),
    })
}