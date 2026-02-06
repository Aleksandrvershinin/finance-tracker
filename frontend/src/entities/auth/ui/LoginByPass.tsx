import { useForm } from 'react-hook-form'
import { authFormSchema, TAuthForm } from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../lib/useAuth'
import AuthForm from './form/AuthForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const LoginByPass = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = (location.state as { from?: Location })?.from?.pathname || '/'
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAuthForm>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { email: '', password: '' },
    })
    const { mutateAsync, isPending, errorMessage } = useLogin()
    const onSubmit = async (data: TAuthForm) => {
        await mutateAsync(data, {
            onSuccess: () => {
                navigate(from, { replace: true })
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
                error={errorMessage || undefined}
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
