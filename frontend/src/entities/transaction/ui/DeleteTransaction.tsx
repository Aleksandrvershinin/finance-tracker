import { FaTrash } from 'react-icons/fa'
import { TTransaction } from '../types/transaction.types'
import Loading from '@/shared/components/Loading'
import { AnimatePresence } from 'framer-motion'
import MyAlert from '@/shared/components/MyAlert/MyAlert'
import { useTransactionDeleteMutate } from '../lib/useTransactionDeleteMutate'

interface Props {
    transactionId: TTransaction['id']
}

function DeleteTransaction({ transactionId }: Props) {
    const { mutate, isPending, errorMessage } = useTransactionDeleteMutate()
    const handleDelete = async () => {
        const conf = confirm(`Подтвердите удаление транзакции`)
        if (!conf) return
        mutate(transactionId)
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

export default DeleteTransaction
