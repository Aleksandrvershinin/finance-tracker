import { TCategory } from '../types/category.types'
import { getCategoryType } from '@/shared/lib/getCategoryType'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useCategoryList } from '../lib/useCategoryList'
import { useCategoryDeleteMutation } from '../lib/useCategoryDeleteMutation'
import { ColumnDef } from '@tanstack/react-table'
import { useMyTable } from '@/shared/lib/hooks/useMyTable'
import MyTableUI from '@/shared/components/ui/MyTableUI/MyTableUI'
import clsx from 'clsx'

interface Props {
    handleEditClick: (category: TCategory) => void
    handleClose: () => void
}

function CategoryTable({ handleEditClick, handleClose }: Props) {
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
    const columns: ColumnDef<TCategory>[] = [
        {
            accessorKey: 'name',
            header: 'Название',
            cell: ({ row }) => row.original.name,
        },
        {
            accessorKey: 'type',
            header: 'Тип',
            cell: ({ row }) => {
                const t = row.original
                return (
                    <p
                        className={clsx(
                            'font-semibold',
                            t.type === 'EXPENSE'
                                ? 'text-red-500'
                                : 'text-green-500',
                        )}
                    >
                        {getCategoryType(t.type)}
                    </p>
                )
            },
        },
        {
            id: 'actions',
            header: 'Действия',
            enableSorting: false,
            cell: ({ row }) => (
                <div className="flex gap-x-2">
                    <button
                        title="Редактировать"
                        onClick={() => handleEditClick(row.original)}
                    >
                        <FaEdit className="text-blue-500" size={23} />
                    </button>
                    <button
                        title="Удалить"
                        onClick={() => {
                            handleDelete(row.original)
                        }}
                    >
                        <FaTrash className="text-red-500" color="" size={28} />
                    </button>
                </div>
            ),
        },
    ]
    const table = useMyTable(categories, columns)
    return (
        <>
            <div className="max-w-[500px]">
                <MyTableUI table={table} />
            </div>
            <AnimatePresence>{isPending && <Loading />}</AnimatePresence>
            {errorMessage && <MyAlert type="error" text={errorMessage} />}
        </>
    )
}

export default CategoryTable
