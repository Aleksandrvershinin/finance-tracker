import Button from '@/shared/components/ui/Button/Button'
import AuthForm from './form/AuthForm'

function Signup() {
    return (
        <AuthForm
            buttons={[<Button className="w-full">Зарегистрироваться</Button>]}
            onSubmit={handleSubmit(onSubmit)}
            title="Регистрация"
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
    )
}

export default Signup
