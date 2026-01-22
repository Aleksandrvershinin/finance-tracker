import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi } from '../api/account.api'
import { TAccount, TAccountForm } from '../types/account.types'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

export const useAccountMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (params: { data: TAccountForm; id?: TAccount['id'] }) => {
            const { data, id } = params
            return id
                ? accountApi.update(data, id)
                : accountApi.store(data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(accountApi.getAccountListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}