import { useForm } from 'react-hook-form'
import { useAuthStore } from '../lib/useAuthStore'
import {
    confirmCodeEmailFormSchema,
    TConfirmCodeEmailForm,
} from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthForm from './form/AuthForm'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/shared/components/ui/Button/Button'
import { ImSpinner2 } from 'react-icons/im'
import FormIput from '@/shared/components/form/FormInput'
import { useLoginBycode } from '../lib/useAuth'
import { ResendButton } from './ResendButton'
import { authApi } from '../api/auth.api'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { useState } from 'react'

export const ConfirmCodeEmail = () => {
    const [isPendingResendCode, setIsPendingResendCode] = useState(false)
    const navigate = useNavigate()
    const setNextSendAt = useAuthStore((s) => s.setNextSendAt)
    const email = useAuthStore((s) => s.email)
    const setEmailAuth = useAuthStore((s) => s.setEmailAuth)
    const setStep = useAuthStore((s) => s.setStep)
    const { mutateAsync, isPending, errorMessage } = useLoginBycode()
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm<TConfirmCodeEmailForm>({
        resolver: zodResolver(confirmCodeEmailFormSchema),
        defaultValues: { email: email ?? '' },
    })
    const onSubmit = async (data: TConfirmCodeEmailForm) => {
        await mutateAsync(data, {
            onSuccess: () => {
                navigate('/', { replace: true })
                setStep('request code')
                setEmailAuth(null)
            },
        })
    }
    const handleClickChangeEmail = () => {
        setStep('request code')
        setEmailAuth(null)
    }
    const handleClickResendCode = async () => {
        if (!email) return
        setIsPendingResendCode(true)
        try {
            const res = await authApi.requestCodeEmail({ email })
            if (res.success) {
                setNextSendAt()
            }
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            setError('email', { message: errorMessage })
        } finally {
            setIsPendingResendCode(false)
        }
    }
    return (
        <AuthForm
            footer={
                <div className="space-y-2 mt-2">
                    <div className="flex gap-x-2 justify-center">
                        <button
                            className="text-blue-500"
                            onClick={handleClickChangeEmail}
                        >
                            Изменить email
                        </button>
                    </div>
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
                <>
                    <Button
                        disabled={isPending}
                        className="w-full flex items-center justify-center"
                    >
                        {isPending && (
                            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isPending ? 'Отправка...' : 'Войти'}
                    </Button>
                    <ResendButton>
                        <Button
                            onClick={handleClickResendCode}
                            disabled={isPendingResendCode}
                            className="w-full flex items-center justify-center"
                        >
                            {isPendingResendCode && (
                                <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isPendingResendCode
                                ? 'Отправка...'
                                : 'Отправить код еще раз'}
                        </Button>
                    </ResendButton>
                </>
            }
            onSubmit={handleSubmit(onSubmit)}
            title="Авторизация"
            error={errorMessage || undefined}
            fields={[
                <FormIput
                    readOnly={true}
                    error={errors.email}
                    control={control}
                    placeholder="email"
                    name="email"
                />,
                <FormIput
                    error={errors.code}
                    control={control}
                    placeholder="код отправленный на email"
                    name="code"
                />,
            ]}
        />
    )
}
