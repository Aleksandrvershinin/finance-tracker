import {
    categoryFormSchema,
    TCategory,
    TCategoryForm,
    TransactionTypeSchema,
} from '../types/category.types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import FormSelect from '@/shared/components/form/FormSelect'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { useCategoryMutation } from '../lib/useCategoryMutation'

type Props = {
    handleClose: () => void
    data?: TCategory
}
const categoryTypes = Object.values(TransactionTypeSchema.enum)

function CategoryForm({ handleClose, data }: Props) {
    const { errorMessage, mutateAsync, isPending } = useCategoryMutation()
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TCategoryForm>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: data?.name,
            type: data?.type,
        },
    })
    const title = data ? 'Редактирование категории' : 'Создание новой категории'
    const onSubmit = async (dataForm: TCategoryForm) => {
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
                <FormIput<TCategoryForm>
                    label="Название"
                    error={errors.name}
                    control={control}
                    placeholder="Название"
                    name="name"
                />,
                <>
                    {!data && (
                        <FormSelect<TCategoryForm>
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
            ]}
        />
    )
}

export default CategoryForm
