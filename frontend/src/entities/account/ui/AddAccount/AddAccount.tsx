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
import MyForm from '@/shared/components/form/MyForm/MyForm'
import FormSelect from '@/shared/components/form/FormSelect'
import { useAccountMutation } from '../../lib/useAccountMutations'
import { useGroupAccountList } from '@/entities/groupAccount/lib/useGroupAccountList'
import { useCurrencyList } from '@/entities/currency/lib/useCurrencyList'
import { useTagAccountList } from '@/entities/tagAccount/lib/useTagAccountList'

interface Props {
    handleClose: () => void
    account?: TAccount
}

function AddAccount({ handleClose, account }: Props) {
    const { data: groups = [] } = useGroupAccountList()
    const { data: tags = [] } = useTagAccountList()
    const {
        mutateAsync: saveAccount,
        errorMessage,
        isPending,
    } = useAccountMutation()
    const { data: currencies } = useCurrencyList()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAccountForm>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            initialBalance: account?.initialBalance || 0,
            name: account?.name || '',
            order: account?.order,
            accountTagId: account?.accountTag?.id,
            groupId: account?.accountGroup?.id,
        },
    })
    const onSubmit = async (data: TAccountForm) => {
        const res = await saveAccount({ data, id: account?.id })
        if (res) {
            saveAccount({ data, id: account?.id })
            handleClose()
        }
    }
    return (
        <>
            {currencies && currencies.length > 0 ? (
                <MyForm
                    hadleClose={handleClose}
                    error={errorMessage}
                    className="lg:min-w-[500px]"
                    myTitle={
                        account
                            ? 'Редактирование нового счета'
                            : 'Создание нового счета'
                    }
                    handlerSubmit={handleSubmit(onSubmit)}
                    buttons={
                        <div className="flex flex-col gap-y-4">
                            <Button
                                myColor={'green500'}
                                disabled={isPending}
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
                            toLocaleStr
                            removeZero
                            label="Начальный баланс"
                            error={errors.initialBalance}
                            control={control}
                            placeholder="Введите начальный баланс"
                            name="initialBalance"
                        />,
                        <FormItem<TAccountForm>
                            label="Сортировка"
                            error={errors.order}
                            control={control}
                            placeholder="Сортировка"
                            name="order"
                        />,
                        <FormSelect<TAccountForm>
                            isClearable
                            placeholder="Группа счетов"
                            options={groups.map((group) => ({
                                value: group.id,
                                label: group.name,
                            }))}
                            label="Группа счетов"
                            error={errors.groupId}
                            control={control}
                            name="groupId"
                        />,
                        <FormSelect<TAccountForm>
                            isClearable
                            placeholder="Тег для счета"
                            options={tags.map((tag) => ({
                                value: tag.id,
                                label: (
                                    <div style={{ color: tag.color }}>
                                        {tag.name}
                                    </div>
                                ),
                            }))}
                            label="Тег для счета"
                            error={errors.accountTagId}
                            control={control}
                            name="accountTagId"
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
