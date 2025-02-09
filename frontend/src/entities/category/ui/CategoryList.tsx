import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { useCategoriesStore } from '../lib/useCategoriesStore'
import { TCategory } from '../types/category.types'
import EditIcon from '@/shared/components/ui/icons/EditIcon'
import DeleteIcon from '@/shared/components/ui/icons/DeleteIcon'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { useFetch } from '@/shared/lib/hooks/useFetch'
import { categoryApi } from '../api/category.api'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'

interface Props {
    handleEditClick: (category: TCategory) => void
    handleClose: () => void
}

const headers = [<>Название</>, <>Тип</>, <>Действия</>]

function CategoryList({ handleEditClick, handleClose }: Props) {
    const loadCategories = useCategoriesStore((state) => state.load)
    const { error, fetchFunction, isLoading } = useFetch()
    const categories = useCategoriesStore((state) => state.categories)
    const handleDelete = async (category: TCategory) => {
        const conf = confirm(`Подтвердите удаление категории ${category.name}`)
        if (!conf) return
        const res = await fetchFunction(async () => {
            return await categoryApi.delete(category.id)
        })
        if (res) {
            loadCategories()
            handleClose()
        }
    }
    const renderCurrenciesRow = (category: TCategory) => [
        <>{category.name}</>,
        <>{getCategoryType(category.type)}</>,
        <div className="space-x-4">
            <button
                onClick={() => {
                    handleEditClick(category)
                }}
            >
                <EditIcon />
            </button>
            <button
                onClick={() => {
                    handleDelete(category)
                }}
            >
                <DeleteIcon />
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
            <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
            {error && <MyAlert type="error" text={error} />}
        </>
    )
}

export default CategoryList
