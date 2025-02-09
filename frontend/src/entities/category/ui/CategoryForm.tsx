import { useFetch } from '@/shared/lib/hooks/useFetch'
import {
    categoryFormSchema,
    TCategory,
    TCategoryForm,
    TransactionTypeSchema,
} from '../types/category.types'
import { useCategoriesStore } from '../lib/useCategoriesStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categoryApi } from '../api/category.api'
import MyForm from '@/shared/components/form/MyForm/MyForm'
import Button from '@/shared/components/ui/Button/Button'
import FormIput from '@/shared/components/form/FormInput'
import FormSelect from '@/shared/components/form/FormSelect'
import { getCategoryType } from '@/shared/lib/getCategoryType'

type Props = {
    handleClose: () => void
    data?: TCategory
}
const categoryTypes = Object.values(TransactionTypeSchema.enum)

function CategoryForm({ handleClose, data }: Props) {
    const { error, fetchFunction, isLoading } = useFetch()
    const loadCategories = useCategoriesStore((state) => state.load)
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
        const res = await fetchFunction(async () => {
            return await (data
                ? categoryApi.update(dataForm, data.id)
                : categoryApi.store(dataForm))
        })
        if (res) {
            loadCategories()
            handleClose()
        }
    }
    return (
        <MyForm
            hadleClose={handleClose}
            error={error}
            className="min-w-[500px]"
            title={title}
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
                <FormIput<TCategoryForm>
                    label="Название"
                    error={errors.name}
                    control={control}
                    placeholder="Название"
                    name="name"
                />,
                <FormSelect<TCategoryForm>
                    options={categoryTypes.map((type) => ({
                        value: type,
                        label: getCategoryType(type),
                    }))}
                    label="Тип категории"
                    error={errors.type}
                    control={control}
                    name="type"
                />,
            ]}
        />
    )
}

export default CategoryForm
