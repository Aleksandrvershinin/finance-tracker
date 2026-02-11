import { useAuth } from '@/features/auth/lib/useAuth'

export function TotalBalance({ total }: { total: number }) {
    const { data: user } = useAuth()
    return (
        <div className="mb-5 p-4 space-y-4 rounded-2xl shadow-my-soft bg-green-100 text-green-600">
            <div className="flex items-center gap-x-2 text-xl text-green-600 font-bold px-4 whitespace-nowrap">
                <p>Общая сумма:</p>
                <p>{total.toLocaleString()}</p>
                <p>{user?.currency.symbol}</p>
            </div>
        </div>
    )
}
