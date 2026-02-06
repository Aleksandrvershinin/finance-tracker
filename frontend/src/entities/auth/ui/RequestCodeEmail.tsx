import { useForm } from 'react-hook-form'
import {
    requestCodeEmailFormSchema,
    TRequestCodeEmailForm,
} from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthForm from './form/AuthForm'
import { Link } from 'react-router-dom'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import { useAuthStore } from '../lib/useAuthStore'
import { useState } from 'react'
import { authApi } from '../api/auth.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { ImSpinner2 } from 'react-icons/im'
import { ResendButton } from './ResendButton'

export const RequestCodeEmail = () => {
    const setNextSendAt = useAuthStore((s) => s.setNextSendAt)
    const [isPending, setIsPending] = useState(false)
    const email = useAuthStore((s) => s.email)
    const setEmailAuth = useAuthStore((s) => s.setEmailAuth)
    const setStep = useAuthStore((s) => s.setStep)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<TRequestCodeEmailForm>({
        resolver: zodResolver(requestCodeEmailFormSchema),
        defaultValues: { email: email ?? '' },
    })

    const onSubmit = async (data: TRequestCodeEmailForm) => {
        setIsPending(true)
        try {
            const res = await authApi.requestCodeEmail(data)
            if (res.success) {
                setNextSendAt()
                setStep('confirm code')
                setEmailAuth(data.email)
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            setError('email', { message: errorMessage })
        } finally {
            setIsPending(false)
        }
    }
    return (
        <AuthForm
            footer={
                <div className="space-y-2 mt-2">
                    <div className="flex gap-x-2 justify-center">
                        <Link
                            to={'/login?method=pass'}
                            className="text-blue-500"
                        >
                            Войти по паролю
                        </Link>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <p>Нет аккаунта?</p>
                        <Link to={'/signup'} className="text-blue-500">
                            Зарегистрироваться
                        </Link>
                    </div>
                </div>
            }
            buttons={
                <ResendButton>
                    <Button
                        disabled={isPending}
                        className="w-full flex items-center justify-center"
                    >
                        {isPending && (
                            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isPending ? 'Отправка...' : 'Отправить код на email'}
                    </Button>
                </ResendButton>
            }
            onSubmit={handleSubmit(onSubmit)}
            title="Авторизация"
            error={undefined}
            fields={[
                <FormIput
                    error={errors.email}
                    control={control}
                    placeholder="email"
                    name="email"
                />,
            ]}
        />
    )
}
