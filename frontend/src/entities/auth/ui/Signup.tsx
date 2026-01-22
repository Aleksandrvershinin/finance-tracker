import Button from '@/shared/components/ui/Button/Button'
import AuthForm from './form/AuthForm'
import { useForm } from 'react-hook-form'
import { signupFormSchema, TSignupForm } from '../types/auth.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '../lib/useAuthStore'
import FormItem from '@/shared/components/form/FormInput'
import FormSelect from '@/shared/components/form/FormSelect'
import Loading from '@/shared/components/Loading'
import { useSignup } from '../lib/useAuth'
import { useCurrencyList } from '@/entities/currency/lib/useCurrencyList'

function Signup() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TSignupForm>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: { email: '', password: '', name: '' },
    })
    const { mutateAsync, isPending, errorMessage } = useSignup()
    const {
        data: currencies = [],
        isLoading: isLoadingCurrencies,
        error: errorCurrencies,
    } = useCurrencyList()
    const setComponent = useAuthStore((state) => state.setComponent)

    const onSubmit = (data: TSignupForm) => {
        mutateAsync(data)
    }
    if (errorCurrencies) {
        return (
            <p className="text-red-500 text-xl font-bold fixed inset-0 overflow-auto flex flex-col items-center pt-20 bg-gray-100">
                Произошла неизвестная ошибка, попробуйте обновить страницу
            </p>
        )
    }
    return (
        <>
            {isLoadingCurrencies && <Loading />}
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
                buttons={
                    <Button disabled={isPending} className="w-full">
                        Зарегистрироваться
                    </Button>
                }
                onSubmit={handleSubmit(onSubmit)}
                title="Регистрация"
                error={errorMessage || undefined}
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
                        type="password"
                        name="password"
                    />,
                    <FormSelect<TSignupForm>
                        options={currencies.map((curr) => ({
                            value: curr.id,
                            label: curr.code,
                        }))}
                        isClearable
                        label="Валюта"
                        error={errors.currencyId}
                        control={control}
                        name="currencyId"
                    />,
                ]}
            />
        </>
    )
}

export default Signup
