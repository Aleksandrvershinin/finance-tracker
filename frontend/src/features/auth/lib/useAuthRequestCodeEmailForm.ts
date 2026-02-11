import { useFormWithRecaptcha } from '@/shared/lib/hooks/useReCaptchaForm'
import {
    requestCodeEmailFormSchema,
    TRequestCodeEmailForm,
} from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from './useAuthStore'

export const useAuthRequestCodeEmailForm = () => {
    const email = useAuthStore((s) => s.email)
    const methods = useFormWithRecaptcha<TRequestCodeEmailForm>({
        formProps: {
            resolver: zodResolver(requestCodeEmailFormSchema),
            defaultValues: { email: email ?? '' },
        },
        action: 'loginCodeRequest',
    })
    return { ...methods }
}
