import { userSchema } from '@/entities/user/types/user.types'
import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 4

export const loginResponseSchema = z.object({
    accessToken: z.string().nonempty(),
    user: userSchema,
})

export const authFormSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z
        .string()
        .min(
            MIN_PASSWORD_LENGTH,
            `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`,
        ),
})

export const signupFormSchema = z.object({
    name: z.string().nonempty({ message: 'Имя обязательно' }),
    email: z.string().email('Некорректный email'),
    password: z
        .string()
        .min(
            MIN_PASSWORD_LENGTH,
            `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`,
        ),
})

export type TAuthForm = z.infer<typeof authFormSchema>
export type TSignupForm = z.infer<typeof signupFormSchema>
export type TLoginResponse = z.infer<typeof loginResponseSchema>
export type TTypeComponent = 'login' | 'signup'
