import { FaTrash } from 'react-icons/fa'
import { TTransaction } from '../types/transaction.types'
import { useTransactionsStore } from '../lib/useTransactionStore'
import { useAccountStore } from '@/entities/account/lib/useAccountStore'
import { transactionApi } from '../api/transaction.api'
import { useFetch } from '@/shared/lib/hooks/useFetch'
import Loading from '@/shared/components/Loading'
import { AnimatePresence } from 'framer-motion'
import MyAlert from '@/shared/components/MyAlert/MyAlert'

interface Props {
    transactionId: TTransaction['id']
}

function DeleteTransaction({ transactionId }: Props) {
    const loadTransactions = useTransactionsStore((state) => state.load)
    const loadAccounts = useAccountStore((state) => state.load)
    const { error, fetchFunction, isLoading, resetError } = useFetch()
    const handleDelete = async () => {
        const conf = confirm(`Подтвердите удаление транзакции`)
        if (!conf) return
        const res = await fetchFunction(async () => {
            return await transactionApi.delete(transactionId)
        })
        if (res) {
            loadTransactions()
            loadAccounts()
        }
    }
    return (
        <>
            <button title="Удалить" onClick={handleDelete}>
                <FaTrash className="text-red-500" color="" size={28} />
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

export default DeleteTransaction
