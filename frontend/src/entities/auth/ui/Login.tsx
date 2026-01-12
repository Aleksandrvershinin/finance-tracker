import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../lib/useAuthStore'
import { authFormSchema, TAuthForm } from '../types/auth.types'
import FormItem from '@/shared/components/form/FormInput'
import Button from '@/shared/components/ui/Button/Button'
import AuthForm from './form/AuthForm'
import { useLogin } from '../lib/useAuth'

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAuthForm>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { email: '', password: '' },
    })
    const { mutateAsync, isPending, errorMessage } = useLogin()
    const setComponent = useAuthStore((state) => state.setComponent)
    const onSubmit = async (data: TAuthForm) => {
        await mutateAsync(data)
    }

    return (
        <>
            <AuthForm
                footer={
                    <div className="flex gap-x-2 justify-center">
                        <p>Нет аккаунта?</p>
                        <button
                            onClick={() => {
                                setComponent('signup')
                            }}
                            className="text-blue-500"
                        >
                            Зарегистрироваться
                        </button>
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
                    <FormItem
                        error={errors.email}
                        control={control}
                        placeholder="email"
                        name="email"
                    />,
                    <FormItem
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

export default Login
