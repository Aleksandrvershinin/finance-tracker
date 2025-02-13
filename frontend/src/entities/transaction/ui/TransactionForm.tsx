/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFetch } from '@/shared/lib/hooks/useFetch'
import { useForm } from 'react-hook-form'
import {
    transactionFormSchema,
    TTransaction,
    TTransactionForm,
} from '../types/transaction.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionApi } from '../api/transaction.api'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import FormSelect from '@/shared/components/form/FormSelect'
import { useCategoriesStore } from '@/entities/category/lib/useCategoriesStore'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { TransactionTypeSchema } from '@/entities/category/types/category.types'
import FormIput from '@/shared/components/form/FormInput'
import { useTransactionsStore } from '../lib/useTransactionStore'
import clsx from 'clsx'

const categoryTypes = Object.values(TransactionTypeSchema.enum)

interface Props {
    handleClose: () => void
    transactionId?: TTransaction['id']
    transactionCategoryId?: TTransactionForm['categoryId']
    transactionAmount?: TTransactionForm['amount']
    transactionDate?: TTransaction['date']
    transactionComment?: TTransactionForm['comment']
    transactionAccountId?: TTransactionForm['accountId']
    transactionType?: TTransactionForm['type']
}
function TransactionForm({
    handleClose,
    transactionId,
    transactionCategoryId,
    transactionAmount,
    transactionDate,
    transactionComment,
    transactionAccountId,
    transactionType,
}: Props) {
    const accounts = useAccountStore((state) => state.accounts)
    const loadTransactions = useTransactionsStore((state) => state.load)
    const loadAccounts = useAccountStore((state) => state.load)
    const categories = useCategoriesStore((state) => state.categories)
    const { error, fetchFunction, isLoading } = useFetch()
    const defaultDate = transactionDate
        ? new Date(transactionDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<TTransactionForm>({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            accountId: transactionAccountId,
            type: transactionType,
            categoryId: transactionCategoryId,
            amount: transactionAmount,
            // @ts-ignore
            date: defaultDate,
            comment: transactionComment,
        },
    })
    const selectedCategory = watch('type')
    const selectedCategories = categories.filter(
        (category) => category.type === selectedCategory,
    )
    const title = 'Создание новой транзакции'
    const titleType = transactionType ? getCategoryType(transactionType) : null
    const onSubmit = async (dataForm: TTransactionForm) => {
        const res = await fetchFunction(async () => {
            return await (transactionId
                ? transactionApi.update(dataForm, transactionId)
                : transactionApi.store(dataForm))
        })
        if (res) {
            loadAccounts()
            loadTransactions()
            handleClose()
        }
    }
    return (
        <MyForm
            hadleClose={handleClose}
            error={error}
            className="lg:min-w-[500px]"
            myTitle={
                <>
                    <p>{title}</p>
                    {titleType && (
                        <p
                            className={clsx({
                                'text-red-500': titleType === 'Расход',
                                'text-green-500': titleType === 'Доход',
                            })}
                        >
                            {titleType}
                        </p>
                    )}
                </>
            }
            handlerSubmit={handleSubmit(onSubmit)}
            buttons={
                <div className="flex flex-col gap-y-4">
                    <Button disabled={isLoading} className="w-full">
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
                <>
                    {!transactionAccountId && (
                        <FormSelect<TTransactionForm>
                            placeholder="Выберете счет"
                            options={accounts.map((account) => ({
                                value: account.id,
                                label: account.name,
                            }))}
                            label="Счет"
                            error={errors.accountId}
                            control={control}
                            name="accountId"
                        />
                    )}
                </>,
                <>
                    {!transactionType && (
                        <FormSelect<TTransactionForm>
                            placeholder="Выберете тип категории"
                            options={categoryTypes.map((type) => ({
                                value: type,
                                label: getCategoryType(type),
                            }))}
                            label="Тип категории"
                            error={errors.type}
                            control={control}
                            name="type"
                        />
                    )}
                </>,
                <FormSelect<TTransactionForm>
                    placeholder="Выберете категорию"
                    options={selectedCategories.map((category) => ({
                        value: category.id,
                        label: category.name,
                    }))}
                    label="Категория"
                    error={errors.categoryId}
                    control={control}
                    name="categoryId"
                />,
                <FormIput<TTransactionForm>
                    type="number"
                    label="Сумма"
                    error={errors.amount}
                    control={control}
                    placeholder="Введите сумму"
                    name="amount"
                />,
                <FormIput<TTransactionForm>
                    type="date"
                    label="Дата совершения"
                    error={errors.date}
                    control={control}
                    name="date"
                />,
                <FormIput<TTransactionForm>
                    label="Коментарий"
                    error={errors.comment}
                    control={control}
                    placeholder="Введите коментарий"
                    name="comment"
                />,
            ]}
        />
    )
}

export default TransactionForm
