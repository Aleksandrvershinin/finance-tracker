import { useFetch } from '@/shared/lib/hooks/useFetch'
import { useAccountTagsStore } from '../lib/useAccountTagsStore'
import { TAccountTag } from '../types/accountTags.types'
import { accountTagsApi } from '../api/accountTags.api'
import { FaEdit, FaTrash } from 'react-icons/fa'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'

interface Props {
    handleEditClick: (accountTag: TAccountTag) => void
    handleClose: () => void
}
const headers = [<>Название</>, <>Действия</>]
export default function AccountTagsList({
    handleEditClick,
    handleClose,
}: Props) {
    const loadTags = useAccountTagsStore((state) => state.load)
    const accountTags = useAccountTagsStore((state) => state.accountTags)
    const { error, fetchFunction, isLoading, resetError } = useFetch()
    const handleDelete = async (accountTag: TAccountTag) => {
        const conf = confirm(`Подтвердите удаление ${accountTag.name}`)
        if (!conf) return
        const res = await fetchFunction(async () => {
            return await accountTagsApi.delete(accountTag.id)
        })
        if (res) {
            loadTags()
            handleClose()
        }
    }
    const renderCurrenciesRow = (accountTag: TAccountTag) => [
        <>{accountTag.name}</>,
        <div className="space-x-4">
            <button
                title="Редактировать"
                onClick={() => {
                    handleEditClick(accountTag)
                }}
            >
                <FaEdit className="text-blue-500" color="" size={30} />
            </button>
            <button
                title="Удалить"
                onClick={() => {
                    handleDelete(accountTag)
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
                    data={[...accountTags]}
                />
            </div>
            <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
            {error && (
                <MyAlert
                    onCloseCallback={resetError}
                    type="error"
                    text={error}
                />
            )}
        </>
    )
}
