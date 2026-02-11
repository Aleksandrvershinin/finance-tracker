import { Link } from 'react-router-dom'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { ImSpinner2 } from 'react-icons/im'
import { WithRecaptcha } from '@/shared/types/WithRecaptcha'
import { useAuthRequestCodeEmail } from '../lib/useAuthRequestCodeEmail'
import { useAuthStore } from '../lib/useAuthStore'
import { useAuthRequestCodeEmailForm } from '../lib/useAuthRequestCodeEmailForm'
import { TRequestCodeEmailForm } from '../types/auth.types'
import AuthForm from './form/AuthForm'
import { WrapResendButton } from '@/shared/components/ui/WrapResendButton'

export const RequestCodeEmailForm = () => {
    const { mutate, isPending } = useAuthRequestCodeEmail()
    const setNextSendAt = useAuthStore((s) => s.setNextSendAt)
    const nextSendAt = useAuthStore((s) => s.nextSendAt)
    const setEmailAuth = useAuthStore((s) => s.setEmailAuth)
    const setStep = useAuthStore((s) => s.setStep)
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useAuthRequestCodeEmailForm()

    const onSubmit = async (data: WithRecaptcha<TRequestCodeEmailForm>) => {
        mutate(data, {
            onSuccess: (res) => {
                if (res.success) {
                    setNextSendAt()
                    setStep('confirm code')
                    setEmailAuth(data.email)
                }
            },
            onError(error) {
                const errorMessage = getErrorMessage(error)
                setError('root', { message: errorMessage })
            },
        })
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
                <WrapResendButton nextSendAt={nextSendAt}>
                    <Button
                        disabled={isPending}
                        className="w-full flex items-center justify-center"
                    >
                        {isPending && (
                            <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isPending ? 'Отправка...' : 'Отправить код на email'}
                    </Button>
                </WrapResendButton>
            }
            onSubmit={handleSubmit(onSubmit)}
            title="Авторизация"
            error={errors.root?.message}
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
