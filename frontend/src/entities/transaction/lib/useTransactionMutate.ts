import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApi } from "../api/transaction.api";
import { TTransaction, TTransactionForm } from "../types/transaction.types";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { accountApi } from "@/entities/account/api/account.api";

export const useTransactionMutate = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (params: { data: TTransactionForm; id?: TTransaction['id'] }) => {
            const { data, id } = params
            return id
                ? transactionApi.update(data, id)
                : transactionApi.store(data)
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