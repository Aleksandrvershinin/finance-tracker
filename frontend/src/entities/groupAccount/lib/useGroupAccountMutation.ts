import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TGroupAccount, TGroupAccountForm } from "../types/groupAccount.types";
import { groupAccountApi } from "../api/groupAccount.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

export const useGroupAccountMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (params: { data: TGroupAccountForm; id?: TGroupAccount['id'] }) => {
            const { data, id } = params

            return id
                ? groupAccountApi.update(data, id)
                : groupAccountApi.store(data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(groupAccountApi.getGroupAccountListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}