import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { TCategory } from '../types/category.types'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useCategoryList } from '../lib/useCategoryList'
import { useCategoryDeleteMutation } from '../lib/useCategoryDeleteMutation'

interface Props {
    handleEditClick: (category: TCategory) => void
    handleClose: () => void
}

const headers = [<>Название</>, <>Тип</>, <>Действия</>]

function CategoryList({ handleEditClick, handleClose }: Props) {
    const { mutateAsync, isPending, errorMessage } = useCategoryDeleteMutation()
    const { data: categories = [] } = useCategoryList()
    const handleDelete = async (category: TCategory) => {
        const conf = confirm(`Подтвердите удаление категории ${category.name}`)
        if (!conf) return
        const res = await mutateAsync(category.id)
        if (res) {
            handleClose()
        }
    }
    const renderCurrenciesRow = (category: TCategory) => [
        <>{category.name}</>,
        <>{getCategoryType(category.type)}</>,
        <div className="space-x-4">
            <button
                title="Редактировать"
                onClick={() => {
                    handleEditClick(category)
                }}
            >
                <FaEdit className="text-blue-500" color="" size={30} />
            </button>
            <button
                title="Удалить"
                onClick={() => {
                    handleDelete(category)
                }}
            >
                <FaTrash className="text-red-500" color="" size={28} />
            </button>
        </div>,
    ]

    return (
        <>
            <div className="max-w-[500px]">
                <MyTable
                    headers={headers}
                    renderRow={renderCurrenciesRow}
                    data={[...categories]}
                />
            </div>
            <AnimatePresence>{isPending && <Loading />}</AnimatePresence>
            {errorMessage && <MyAlert type="error" text={errorMessage} />}
        </>
    )
}

export default CategoryList
