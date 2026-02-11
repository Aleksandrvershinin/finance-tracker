import { authFormSchema, TAuthForm } from '../types/auth.types'
import { useLogin } from '../lib/useAuth'
import AuthForm from './form/AuthForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormWithRecaptcha } from '@/shared/lib/hooks/useReCaptchaForm'
import { WithRecaptcha } from '@/shared/types/WithRecaptcha'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { zodResolver } from '@hookform/resolvers/zod'

export const LoginByPass = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as { from?: Location })?.from?.pathname || '/'
    const {
        formState: { errors },
        handleSubmit,
        setError,
        control,
    } = useFormWithRecaptcha<TAuthForm>({
        formProps: {
            resolver: zodResolver(authFormSchema),
            defaultValues: { email: '', password: '' },
        },
        action: 'login',
    })
    const { mutateAsync, isPending } = useLogin()
    const onSubmit = async (data: WithRecaptcha<TAuthForm>) => {
        await mutateAsync(data, {
            onSuccess: () => {
                navigate(from, { replace: true })
            },
            onError: (error) => {
                setError('root', { message: getErrorMessage(error) })
            },
        })
    }

    return (
        <>
            <AuthForm
                footer={
                    <div className="space-y-2 mt-2">
                        <div className="flex gap-x-2 justify-center">
                            <Link
                                to={'/login?method=code'}
                                className="text-blue-500"
                            >
                                Войти по одноразовому коду
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
                    <Button disabled={isPending} className="w-full">
                        Войти
                    </Button>
                }
                onSubmit={handleSubmit(onSubmit)}
                title="Авторизация"
                error={errors.root?.message || undefined}
                fields={[
                    <FormIput
                        error={errors.email}
                        control={control}
                        placeholder="email"
                        name="email"
                    />,
                    <FormIput
                        error={errors.password}
                        control={control}
                        placeholder="password"
                        type="password"
                        name="password"
                    />,
                ]}
            />
        </>
    )
}
