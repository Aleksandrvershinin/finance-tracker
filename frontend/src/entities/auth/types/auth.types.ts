import { userSchema } from '@/entities/user/types/user.types'
import { validationMessages } from '@/shared/configs/validationMessages'
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
    currencyId: z
        .number({ message: validationMessages.required })
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val), {
            message: validationMessages.required,
        }),
})

export type TAuthForm = z.infer<typeof authFormSchema>
export type TSignupForm = z.infer<typeof signupFormSchema>
export type TLoginResponse = z.infer<typeof loginResponseSchema>
export type TTypeComponent = 'login' | 'signup'
