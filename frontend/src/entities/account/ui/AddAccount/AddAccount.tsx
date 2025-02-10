import { zodResolver } from '@hookform/resolvers/zod'
import {
    accountFormSchema,
    TAccount,
    TAccountForm,
} from '../../types/account.types'
import { useForm } from 'react-hook-form'
import Button from '@/shared/components/ui/Button/Button'
import FormItem from '@/shared/components/form/FormInput'
// import FormSelect from '@/shared/components/form/FormSelect'
import { useCurrencyStore } from '@/entities/currency/lib/useCurrencyStore'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import { useFetch } from '@/shared/lib/hooks/useFetch'
import { accountApi } from '../../api/account.api'
import { useAccountStore } from '../../lib/useAccountStore'

interface Props {
    handleClose: () => void
    account?: TAccount
}

function AddAccount({ handleClose, account }: Props) {
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
            initialBalance: account?.initialBalance || 0,
            name: account?.name || '',
            // currencyId:
            //     account?.currency.id ||
            //     (currencies ? currencies[0]?.id : undefined),
        },
    })
    const onSubmit = async (data: TAccountForm) => {
        const res = await fetchFunction(async () => {
            return await (account
                ? accountApi.update(data, account.id)
                : accountApi.store(data))
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
                    hadleClose={handleClose}
                    error={error}
                    className="min-w-[500px]"
                    myTitle="Создание нового счета"
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
                            placeholder="Введите название счета"
                            name="name"
                        />,
                        <FormItem<TAccountForm>
                            label="Начальный баланс"
                            type="number"
                            error={errors.initialBalance}
                            control={control}
                            placeholder="Введите начальный баланс"
                            name="initialBalance"
                        />,
                        // <>
                        //     {!account && (
                        //         <FormSelect<TAccountForm>
                        //             options={currencies.map((curr) => ({
                        //                 value: curr.id,
                        //                 label: curr.code,
                        //             }))}
                        //             isClearable
                        //             label="Валюта"
                        //             error={errors.currencyId}
                        //             control={control}
                        //             name="currencyId"
                        //         />
                        //     )}
                        // </>,
                    ]}
                />
            ) : (
                <div className="min-w-[500px] min-h-[200px] bg-white p-4 flex flex-col">
                    <p className="text-red-500 text-xl text-center mb-auto">
                        Ошибка! Нет доступных валют!
                    </p>
                    <button
                        className="text-blue-500 w-fit mx-auto"
                        type="button"
                        onClick={handleClose}
                    >
                        Отменить
                    </button>
                </div>
            )}
        </>
    )
}

export default AddAccount
