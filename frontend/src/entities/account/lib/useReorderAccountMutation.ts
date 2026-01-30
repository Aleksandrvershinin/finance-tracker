import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi } from '../api/account.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

export const useReorderAccountMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: accountApi.reorder,
        onSuccess: () => {
            queryClient.invalidateQueries(
                accountApi.getAccountListQueryOptions()
            )
        },
    })

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}
