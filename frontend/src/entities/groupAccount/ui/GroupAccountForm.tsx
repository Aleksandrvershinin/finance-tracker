import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import {
    groupAccountFormSchema,
    TGroupAccount,
    TGroupAccountForm,
} from '../types/groupAccount.types'
import { useGroupAccountMutation } from '../lib/useGroupAccountMutation'
import FormSelect from '@/shared/components/form/FormSelect'

type Props = {
    handleClose: () => void
    data?: TGroupAccount
}

export default function GroupAccountForm({ handleClose, data }: Props) {
    const { mutateAsync, isPending, errorMessage } = useGroupAccountMutation()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TGroupAccountForm>({
        resolver: zodResolver(groupAccountFormSchema),
        defaultValues: {
            name: data?.name,
            order: data?.order,
            // @ts-ignore
            isVisible: data?.isVisible === false ? 'false' : 'true',
        },
    })
    const title = data ? 'Редактирование группы' : 'Создание новой группы'
    const onSubmit = async (dataForm: TGroupAccountForm) => {
        const res = await mutateAsync({ data: dataForm, id: data?.id })
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
                <FormIput<TGroupAccountForm>
                    label="Название"
                    error={errors.name}
                    control={control}
                    placeholder="Название"
                    name="name"
                />,
                <FormIput<TGroupAccountForm>
                    label="Сортировка"
                    error={errors.order}
                    control={control}
                    placeholder="Сортировка"
                    name="order"
                />,
                // <FormSelect<TGroupAccountForm>
                //     options={[
                //         { label: 'Показывать', value: 'true' },
                //         { label: 'Скрывать', value: 'false' },
                //     ]}
                //     label="Показывать группу"
                //     error={errors.isVisible}
                //     control={control}
                //     name="isVisible"
                // />,
            ]}
        />
    )
}
