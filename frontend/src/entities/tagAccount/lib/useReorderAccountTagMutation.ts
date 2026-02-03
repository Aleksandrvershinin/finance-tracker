import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { tagAccountApi } from '../api/tagAccount.api'
import { accountApi } from '@/entities/account/api/account.api'

export const useReorderAccountTagMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: tagAccountApi.reorder,
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
