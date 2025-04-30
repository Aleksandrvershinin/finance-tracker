import { useFetch } from '@/shared/lib/hooks/useFetch'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import {
    accountTagFormSchema,
    TAccountTag,
    TAccountTagForm,
} from '../types/accountTags.types'
import { accountTagsApi } from '../api/accountTags.api'
import { useAccountTagsStore } from '../lib/useAccountTagsStore'

type Props = {
    handleClose: () => void
    data?: TAccountTag
}

export default function AccountTagsForm({ handleClose, data }: Props) {
    const { error, fetchFunction, isLoading } = useFetch()
    const loadTags = useAccountTagsStore((state) => state.load)
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TAccountTagForm>({
        resolver: zodResolver(accountTagFormSchema),
        defaultValues: {
            name: data?.name,
        },
    })
    const title = data ? 'Редактирование tag' : 'Создание нового tag'
    const onSubmit = async (dataForm: TAccountTagForm) => {
        const res = await fetchFunction(async () => {
            return await (data
                ? accountTagsApi.update(dataForm, data.id)
                : accountTagsApi.store(dataForm))
        })
        if (res) {
            loadTags()
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
                <FormIput<TAccountTagForm>
                    label="Название"
                    error={errors.name}
                    control={control}
                    placeholder="Название"
                    name="name"
                />,
            ]}
        />
    )
}
