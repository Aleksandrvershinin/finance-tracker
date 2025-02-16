/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import {
    transferFormSchema,
    TTransfer,
    TTransferForm,
} from '../types/transfer.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useFetch } from '@/shared/lib/hooks/useFetch'
import { transferApi } from '../api/transfer.api'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormSelect from '@/shared/components/form/FormSelect'
import FormIput from '@/shared/components/form/FormInput'
import { useTransfersStore } from '../lib/useTransfersStore'

interface Props {
    handleClose: () => void
    transferId?: TTransfer['id']
    fromAccountId?: TTransfer['fromAccountId']
    toAccountId?: TTransfer['toAccountId']
    date?: TTransfer['date']
    amount?: TTransfer['amount']
    comment?: TTransfer['comment']
}
function TransferForm({
    handleClose,
    amount,
    comment,
    date,
    fromAccountId,
    toAccountId,
    transferId,
}: Props) {
    const accounts = useAccountStore((state) => state.accounts)
    const loadAccounts = useAccountStore((state) => state.load)
    const loadTransfers = useTransfersStore((state) => state.load)
    const { error, fetchFunction, isLoading } = useFetch()
    const defaultDate = date ? date : new Date().toISOString().split('T')[0]
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TTransferForm>({
        resolver: zodResolver(transferFormSchema),
        defaultValues: {
            toAccountId: toAccountId,
            amount: amount,
            fromAccountId: fromAccountId || transferId,
            comment: comment,
            // @ts-ignore
            date: defaultDate,
        },
    })
    const title = 'Перевод'
    const onSubmit = async (dataForm: TTransferForm) => {
        const res = await fetchFunction(async () => {
            return await transferApi.store(dataForm)
        })
        if (res) {
            loadAccounts()
            loadTransfers()
            handleClose()
        }
    }
    return (
        <MyForm
            hadleClose={handleClose}
            error={error}
            className="lg:min-w-[500px]"
            myTitle={title}
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
                <FormSelect<TTransferForm>
                    placeholder="Выберете счет"
                    options={accounts.map((account) => ({
                        value: account.id,
                        label: account.name,
                    }))}
                    label="Со счета"
                    error={errors.fromAccountId}
                    control={control}
                    name="fromAccountId"
                />,
                <FormSelect<TTransferForm>
                    placeholder="Выберете счет"
                    options={accounts.map((account) => ({
                        value: account.id,
                        label: account.name,
                    }))}
                    label="На счет"
                    error={errors.toAccountId}
                    control={control}
                    name="toAccountId"
                />,
                <FormIput<TTransferForm>
                    removeZero
                    toLocaleStr
                    label="Сумма"
                    error={errors.amount}
                    control={control}
                    placeholder="Введите сумму"
                    name="amount"
                />,
                <FormIput<TTransferForm>
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

export default TransferForm
