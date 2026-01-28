import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import {
    tagAccountFormSchema,
    TTagAccount,
    TTagAccountForm,
} from '../types/tagAccount.types'
import { useTagAccountMutation } from '../lib/useTagAccountMutation'
import { ColorPickerForm } from '@/shared/components/form/ColorPickerForm'
// import FormSelect from '@/shared/components/form/FormSelect'

type Props = {
    handleClose: () => void
    data?: TTagAccount
}

export default function TagAccountForm({ handleClose, data }: Props) {
    const { mutateAsync, isPending, errorMessage } = useTagAccountMutation()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TTagAccountForm>({
        resolver: zodResolver(tagAccountFormSchema),
        defaultValues: {
            name: data?.name,
            color: data?.color,
        },
    })
    const title = data ? 'Редактирование тега' : 'Создание нового тега'
    const onSubmit = async (dataForm: TTagAccountForm) => {
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
                <FormIput<TTagAccountForm>
                    label="Название"
                    error={errors.name}
                    control={control}
                    placeholder="Название"
                    name="name"
                />,
                <div className="flex justify-center">
                    <ColorPickerForm
                        control={control}
                        label="цвет"
                        name="color"
                        error={errors.color}
                    />
                </div>,
            ]}
        />
    )
}
