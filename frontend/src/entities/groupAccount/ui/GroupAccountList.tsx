import { FaEdit, FaTrash } from 'react-icons/fa'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { useGroupAccountList } from '../lib/useGroupAccountList'
import { TGroupAccount } from '../types/groupAccount.types'
import { useGroupAccountDeleteMutation } from '../lib/useGroupAccountDeleteMutation'

interface Props {
    handleEditClick: (groupAccount: TGroupAccount) => void
    handleClose: () => void
}
const headers = [<>Название</>, <>Действия</>]
export default function AccountTagsList({
    handleEditClick,
    handleClose,
}: Props) {
    const { data: groups = [], isLoading } = useGroupAccountList()
    const {
        mutateAsync,
        isPending: isPendingDelete,
        errorMessage,
    } = useGroupAccountDeleteMutation()
    const handleDelete = async (groupAccount: TGroupAccount) => {
        const conf = confirm(`Подтвердите удаление ${groupAccount.name}`)
        if (!conf) return
        const res = await mutateAsync(groupAccount.id)
        if (res) {
            handleClose()
        }
    }
    const renderCurrenciesRow = (groupAccount: TGroupAccount) => [
        <>{groupAccount.name}</>,
        <div className="space-x-4">
            <button
                title="Редактировать"
                onClick={() => {
                    handleEditClick(groupAccount)
                }}
            >
                <FaEdit className="text-blue-500" color="" size={30} />
            </button>
            <button
                disabled={isPendingDelete}
                title="Удалить"
                onClick={() => {
                    handleDelete(groupAccount)
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
                    data={[...groups]}
                />
            </div>
            <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
            {errorMessage && <MyAlert type="error" text={errorMessage} />}
        </>
    )
}
