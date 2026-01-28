import { FaEdit, FaTrash } from 'react-icons/fa'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { useGroupAccountList } from '../lib/useGroupAccountList'
import { TGroupAccount } from '../types/groupAccount.types'
import { useGroupAccountDeleteMutation } from '../lib/useGroupAccountDeleteMutation'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useGroupAccountMutation } from '../lib/useGroupAccountMutation'

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
        // mutate: mutateUpdate,
        // isPending: isPendingUpdate,
        errorMessage: errorMessageUpdate,
    } = useGroupAccountMutation()
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
    // const handleChangeIsVisible = (groupAccount: TGroupAccount) => {
    //     const newVisible = !groupAccount.isVisible
    //     mutateUpdate({
    //         data: { ...groupAccount, isVisible: newVisible },
    //         id: groupAccount.id,
    //     })
    // }
    const renderCurrenciesRow = (groupAccount: TGroupAccount) => [
        <>{groupAccount.name}</>,
        <div className="flex justify-center gap-x-6">
            {/* <button
                disabled={isPendingUpdate}
                title={
                    groupAccount.isVisible ? 'Скрыть' : 'Показать' + 'группу'
                }
                onClick={() => {
                    handleChangeIsVisible(groupAccount)
                }}
            >
                {groupAccount.isVisible ? (
                    <FaEye className="text-blue-500" color="" size={30} />
                ) : (
                    <FaEyeSlash className="text-blue-500" color="" size={30} />
                )}
            </button> */}
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
            {groups.length > 0 && (
                <div className="max-w-[500px]">
                    <MyTable
                        headers={headers}
                        renderRow={renderCurrenciesRow}
                        data={[...groups]}
                    />
                </div>
            )}
            <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
            {errorMessage && <MyAlert type="error" text={errorMessage} />}
            {errorMessageUpdate && (
                <MyAlert type="error" text={errorMessageUpdate} />
            )}
        </>
    )
}
