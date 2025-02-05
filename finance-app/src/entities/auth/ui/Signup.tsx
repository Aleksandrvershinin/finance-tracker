import Button from '@/shared/components/ui/Button/Button'
import AuthForm from './form/AuthForm'
import { useForm } from 'react-hook-form'
import { signupFormSchema, TSignupForm } from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../lib/useAuthStore'
import FormItem from '@/shared/components/ui/FormInput'

function Signup() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TSignupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: { email: '', password: '', name: '' },
    })
    const setComponent = useAuthStore((state) => state.setComponent)
    const errorSignup = useAuthStore((state) => state.errorSignup)
    const signup = useAuthStore((state) => state.signup)

    const onSubmit = (data: TSignupForm) => {
        signup(data)
    }
    return (
        <>
            <AuthForm
                footer={
                    <div className="flex gap-x-2 justify-center">
                        <p>Уже есть уккаунт?</p>
                        <button
                            onClick={() => {
                                setComponent('login')
                            }}
                            className="text-blue-500"
                        >
                            Войти
                        </button>
                    </div>
                }
                buttons={[
                    <Button className="w-full">Зарегистрироваться</Button>,
                ]}
                onSubmit={handleSubmit(onSubmit)}
                title="Регистрация"
                error={errorSignup || undefined}
                fields={[
                    <FormItem
                        error={errors.name}
                        control={control}
                        placeholder="Имя"
                        name="name"
                    />,
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
                        name="password"
                    />,
                ]}
            />
        </>
    )
}

export default Signup
