import { TTransfer } from '../types/transfer.types'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { AnimatePresence } from 'framer-motion'
import Loading from '@/shared/components/Loading'
import { FaTrash } from 'react-icons/fa'
import { useTransferDeleteMutate } from '../lib/useTransferDeleteMutate'

interface Props {
    transferId: TTransfer['id']
}

function TransferDelete({ transferId }: Props) {
    const { isPending, mutate, errorMessage } = useTransferDeleteMutate()
    const handleDelete = async () => {
        const conf = confirm(`Подтвердите удаление перевода`)
        if (!conf) return
        mutate(transferId)
    }
    return (
        <>
            <button title="Удалить" onClick={handleDelete}>
                <FaTrash className="text-red-500" color="" size={20} />
            </button>
            <AnimatePresence>{isPending && <Loading />}</AnimatePresence>
            {errorMessage && <MyAlert type="error" text={errorMessage} />}
        </>
    )
}

export default TransferDelete
