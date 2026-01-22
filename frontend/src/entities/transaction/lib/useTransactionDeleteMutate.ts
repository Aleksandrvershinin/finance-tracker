import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "../api/transaction.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { TTransaction } from "../types/transaction.types";
import { accountApi } from "@/entities/account/api/account.api";

export const useTransactionDeleteMutate = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (id: TTransaction['id']) => {
            return transactionApi.delete(id)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(transactionApi.getTransactionListQueryOptions())
            queryClient.invalidateQueries(accountApi.getAccountListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}