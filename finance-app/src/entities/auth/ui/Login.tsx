import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../lib/useAuthStore'
import { authFormSchema, TAuthForm } from '../types/auth.types'
import FormItem from '@/shared/components/ui/FormInput'
import Button from '@/shared/components/ui/Button/Button'
import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ModalOpacity'
import Loading from '@/shared/components/ui/Loading'
import AuthForm from './form/AuthForm'

const Login = ({ isShow = true }: { isShow?: boolean }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAuthForm>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { email: '', password: '' },
    })
    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoadingLogin)
    const errorLogin = useAuthStore((state) => state.errorLogin)
    const onSubmit = async (data: TAuthForm) => {
        await login(data)
    }

    return (
        <>
            <Portal>
                <ModalOpacity isOpen={isShow}>
                    <AuthForm
                        buttons={[<Button className="w-full">Войти</Button>]}
                        onSubmit={handleSubmit(onSubmit)}
                        title="Авторизация"
                        error={errorLogin || undefined}
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
                                name="password"
                            />,
                        ]}
                    />
                </ModalOpacity>
            </Portal>
            <Loading isShow={isLoading} />
        </>
    )
}

export default Login
