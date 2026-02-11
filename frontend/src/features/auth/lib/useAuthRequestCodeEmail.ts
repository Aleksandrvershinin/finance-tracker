import { useMutation } from '@tanstack/react-query'
import { WithRecaptcha } from '@/shared/types/WithRecaptcha'
import { authApi } from '../api/auth.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { TRequestCodeEmailForm } from '../types/auth.types'

export const useAuthRequestCodeEmail = () => {
    const mutation = useMutation({
        mutationFn: (data: WithRecaptcha<TRequestCodeEmailForm>) =>
            authApi.requestCodeEmail(data),

        onError: (error) => {
            console.error(getErrorMessage(error))
        },
    })

    return {
        ...mutation,
    }
}
