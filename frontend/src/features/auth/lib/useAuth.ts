import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import {
    TAuthForm,
    TConfirmCodeEmailForm,
    TSignupForm,
} from '../types/auth.types'
import { accessToken } from '@/shared/api/accessToken.api'
import { userApi } from '@/entities/user/api/user.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { WithRecaptcha } from '@/shared/types/WithRecaptcha'

export const AUTH_QUERY_KEY = ['auth', 'me']

/* ---------- check auth ---------- */
export const useAuth = () => {
    return useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: async () => {
            const user = await userApi.getProfile()
            return user // null | User
        },
        retry: false,
        refetchOnWindowFocus: false,
    })
}

/* ---------- login ---------- */
export const useLogin = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: WithRecaptcha<TAuthForm>) => authApi.login(data),
        onSuccess: (data) => {
            accessToken.setToken(data.accessToken)
            queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
        },
    })

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}

/* ---------- login ---------- */
export const useLoginBycode = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: WithRecaptcha<TConfirmCodeEmailForm>) =>
            authApi.loginByCode(data),
        onSuccess: (data) => {
            accessToken.setToken(data.accessToken)
            queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
        },
    })

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}

/* ---------- signup ---------- */
export const useSignup = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (data: TSignupForm) => authApi.signup(data),
        onSuccess: (data) => {
            accessToken.setToken(data.accessToken)
            queryClient.setQueryData(AUTH_QUERY_KEY, data.user)
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}

/* ---------- logout ---------- */
export const useLogout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => {
            accessToken.removeToken()
            queryClient.setQueryData(AUTH_QUERY_KEY, null)
            return authApi.logout()
        },
        onSuccess: () => {
            // accessToken.removeToken()
            // queryClient.setQueryData(AUTH_QUERY_KEY, null)
        },
    })
}
