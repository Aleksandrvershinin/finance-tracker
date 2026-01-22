import { useQuery } from "@tanstack/react-query"
import { transactionApi } from "../api/transaction.api"


export const useTransactionList = () => {
    return useQuery({
        ...transactionApi.getTransactionListQueryOptions()
    })
}