import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { TTagAccount, TTagAccountForm } from "../types/tagAccount.types";
import { tagAccountApi } from "../api/tagAccount.api";
import { accountApi } from "@/entities/account/api/account.api";

export const useTagAccountMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (params: { data: TTagAccountForm; id?: TTagAccount['id'] }) => {
            const { data, id } = params

            return id
                ? tagAccountApi.update(data, id)
                : tagAccountApi.store(data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(tagAccountApi.getTagAccountListQueryOptions())
            queryClient.invalidateQueries(accountApi.getAccountListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}