import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TTransferForm } from "../types/transfer.types";
import { transferApi } from "../api/transfer.api";
import { accountApi } from "@/entities/account/api/account.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";


export const useTransferMutate = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (params: { data: TTransferForm; }) => {
            const { data } = params
            return transferApi.store(data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(transferApi.getTransferListQueryOptions())
            queryClient.invalidateQueries(accountApi.getAccountListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}