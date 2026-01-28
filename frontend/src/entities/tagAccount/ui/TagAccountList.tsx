import { FaEdit, FaTrash } from 'react-icons/fa'
import MyTable from '@/shared/components/ui/MyTable/MyTable'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { TTagAccount } from '../types/tagAccount.types'
import { useTagAccountList } from '../lib/useTagAccountList'
import { useTagAccountMutation } from '../lib/useTagAccountMutation'
import { useTagAccountDeleteMutation } from '../lib/useTagAccountDeleteMutation'

interface Props {
    handleEditClick: (tagAccount: TTagAccount) => void
    handleClose: () => void
}
const headers = [<>Название</>, <>Действия</>]
export default function TagAccountList({
    handleEditClick,
    handleClose,
}: Props) {
    const { data: tags = [], isLoading } = useTagAccountList()
    const {
        // mutate: mutateUpdate,
        // isPending: isPendingUpdate,
        errorMessage: errorMessageUpdate,
    } = useTagAccountMutation()
    const {
        mutateAsync,
        isPending: isPendingDelete,
        errorMessage,
    } = useTagAccountDeleteMutation()
    const handleDelete = async (tagAccount: TTagAccount) => {
        const conf = confirm(`Подтвердите удаление ${tagAccount.name}`)
        if (!conf) return
        const res = await mutateAsync(tagAccount.id)
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
    const renderCurrenciesRow = (tagAccount: TTagAccount) => [
        <div style={{ color: tagAccount.color, fontWeight: '700' }}>
            {tagAccount.name}
        </div>,
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
                    handleEditClick(tagAccount)
                }}
            >
                <FaEdit className="text-blue-500" color="" size={30} />
            </button>
            <button
                disabled={isPendingDelete}
                title="Удалить"
                onClick={() => {
                    handleDelete(tagAccount)
                }}
            >
                <FaTrash className="text-red-500" color="" size={28} />
            </button>
        </div>,
    ]
    return (
        <>
            {tags.length > 0 && (
                <div className="max-w-[500px]">
                    <MyTable
                        headers={headers}
                        renderRow={renderCurrenciesRow}
                        data={[...tags]}
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
