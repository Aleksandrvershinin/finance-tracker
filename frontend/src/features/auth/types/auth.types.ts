import { userSchema } from '@/entities/user/types/user.types'
import { validationMessages } from '@/shared/configs/validationMessages'
import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 4
export const emailSchema = z.string().email('Некорректный email')
export const requestCodeEmailResponseSchema = z.object({
    success: z.boolean(),
})
export const loginResponseSchema = z.object({
    accessToken: z.string().nonempty(),
    user: userSchema,
})

export const requestCodeEmailFormSchema = z.object({
    email: emailSchema,
})

export const authFormSchema = z.object({
    email: emailSchema,
    password: z
        .string()
        .min(
            MIN_PASSWORD_LENGTH,
            `Пароль должен содержать минимум ${MIN_PASSWORD_LENGTH} символов`,
        ),
})

export const confirmCodeEmailFormSchema = z.object({
    email: emailSchema,
    code: z.string().length(6, 'код должен состоять из 6 символов'),
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
export type TEmailAuth = z.infer<typeof emailSchema>
export type TConfirmCodeEmailForm = z.infer<typeof confirmCodeEmailFormSchema>
export type TRequestCodeEmailForm = z.infer<typeof requestCodeEmailFormSchema>
export type TSignupForm = z.infer<typeof signupFormSchema>
export type TLoginResponse = z.infer<typeof loginResponseSchema>
