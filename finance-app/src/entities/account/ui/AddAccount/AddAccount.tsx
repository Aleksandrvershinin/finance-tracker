import { zodResolver } from '@hookform/resolvers/zod'
import { accountFormSchema, TAccountForm } from '../../types/account.types'
import { useForm } from 'react-hook-form'
import Button from '@/shared/components/ui/Button/Button'
import FormItem from '@/shared/components/form/FormInput'
import FormSelect from '@/shared/components/form/FormSelect'
import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import { useFetch } from '@/shared/lib/hooks/useFetch'
import { accountApi } from '../../api/account.api'
import { useAccountStore } from '../../lib/useAccountStore'

interface Props {
    handleClose: () => void
}

function AddAccount({ handleClose }: Props) {
    const { error, fetchFunction, isLoading } = useFetch()
    const currencies = useCurrencyStore((state) => state.currencies)
    const loadAccounts = useAccountStore((state) => state.load)
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAccountForm>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            balance: 0,
            name: '',
            currencyId: currencies ? currencies[0]?.id : undefined,
        },
    })
    const onSubmit = async (data: TAccountForm) => {
        const res = await fetchFunction(async () => {
            return await accountApi.store(data)
        })
        if (res) {
            loadAccounts()
            handleClose()
        }
    }
    return (
        <>
            {currencies && currencies.length > 0 ? (
                <MyForm
                    error={error}
                    className="min-w-[500px]"
                    title="Создание нового счета"
                    handlerSubmit={handleSubmit(onSubmit)}
                    buttons={
                        <div className="flex flex-col gap-y-4">
                            <Button
                                myColor={'green500'}
                                disabled={isLoading}
                                className="w-full"
                            >
                                Сохранить
                            </Button>
                            <button
                                className="text-blue-500 w-fit mx-auto"
                                type="button"
                                onClick={handleClose}
                            >
                                Отменить
                            </button>
                        </div>
                    }
                    fields={[
                        <FormItem<TAccountForm>
                            label="Название счета"
                            error={errors.name}
                            control={control}
                            placeholder="Название счета"
                            name="name"
                        />,
                        <FormItem<TAccountForm>
                            label="Баланс"
                            type="number"
                            error={errors.balance}
                            control={control}
                            placeholder="Баланс"
                            name="balance"
                        />,
                        <FormSelect<TAccountForm>
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
            ) : (
                <div className="min-w-[500px] min-h-[200px] bg-white p-4 flex flex-col">
                    <p className="text-red-500 text-xl text-center mb-auto">
                        Ошибка! Нет доступных валют!
                    </p>
                    <Button
                        type="button"
                        onClick={handleClose}
                        myColor={'red500'}
                        className="w-full"
                    >
                        Отменить
                    </Button>
                </div>
            )}
        </>
    )
}

export default AddAccount
