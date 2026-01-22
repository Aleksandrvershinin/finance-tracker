import { accountApi } from "@/entities/account/api/account.api"
import { transferApi } from "../api/transfer.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TTransfer } from "../types/transfer.types"
import { getErrorMessage } from "@/shared/lib/getErrorMessage"


export const useTransferDeleteMutate = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: TTransfer['id']) => {
            return transferApi.delete(id)
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