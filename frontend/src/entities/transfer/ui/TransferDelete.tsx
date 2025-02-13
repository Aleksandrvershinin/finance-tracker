import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { useTransfersStore } from '../lib/useTransfersStore'
import { TTransfer } from '../types/transfer.types'
import { transferApi } from '../api/transfer.api'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import { FaTrash } from 'react-icons/fa'
import { useFetch } from '@/shared/lib/hooks/useFetch'

interface Props {
    transferId: TTransfer['id']
}

function TransferDelete({ transferId }: Props) {
    const loadTransfers = useTransfersStore((state) => state.load)
    const loadAccounts = useAccountStore((state) => state.load)
    const { error, fetchFunction, isLoading, resetError } = useFetch()
    const handleDelete = async () => {
        const conf = confirm(`Подтвердите удаление перевода`)
        if (!conf) return
        const res = await fetchFunction(async () => {
            return await transferApi.delete(transferId)
        })
        if (res) {
            loadTransfers()
            loadAccounts()
        }
    }
    return (
        <>
            <button title="Удалить" onClick={handleDelete}>
                <FaTrash className="text-red-500" color="" size={20} />
            </button>
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

export default TransferDelete
