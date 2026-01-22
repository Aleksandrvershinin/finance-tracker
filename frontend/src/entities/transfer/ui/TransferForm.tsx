/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    transferFormSchema,
    TTransfer,
    TTransferForm,
} from '../types/transfer.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormSelect from '@/shared/components/form/FormSelect'
import FormIput from '@/shared/components/form/FormInput'
import { useAccountList } from '@/entities/account/lib/useAccountList'
import { useTransferMutate } from '../lib/useTransferMutate'

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
    const accounts = useAccountList().data || []
    const { isPending, mutateAsync, errorMessage } = useTransferMutate()
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
        const res = await mutateAsync({ data: dataForm })
        if (res) {
            handleClose()
        }
    }

    return (
        <MyForm
            hadleClose={handleClose}
            error={errorMessage}
            className="lg:min-w-[500px]"
            myTitle={title}
            handlerSubmit={handleSubmit(onSubmit)}
            buttons={
                <div className="flex flex-col gap-y-4">
                    <Button disabled={isPending} className="w-full">
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
