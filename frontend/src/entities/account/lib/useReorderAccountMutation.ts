import { useMutation, useQueryClient } from '@tanstack/react-query'
import { accountApi } from '../api/account.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'

export const useReorderAccountMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: accountApi.reorder,
        onMutate: async (reorderedAccounts) => {
            await queryClient.cancelQueries(accountApi.getAccountListQueryOptions())

            // сохраняем текущее состояние для rollback
            const previousData = queryClient.getQueryData(accountApi.getAccountListQueryOptions().queryKey)

            // обновляем кэш сразу
            queryClient.setQueryData(accountApi.getAccountListQueryOptions().queryKey, (oldData) => {
                if (!oldData) return oldData

                return oldData.map((acc: any) => {
                    const updated = reorderedAccounts.find(r => r.id === acc.id)
                    return updated ? { ...acc, order: updated.order } : acc
                })
            })

            // возвращаем previousData для rollback в onError
            return { previousData }
        },

        // при ошибке откатываем
        onError: (_err, _variables, context: any) => {
            if (context?.previousData) {
                queryClient.setQueryData(accountApi.getAccountListQueryOptions().queryKey, context.previousData)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries(accountApi.getAccountListQueryOptions())
        },
    })

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}
