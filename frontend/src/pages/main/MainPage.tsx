import Accounts from '@/entities/account/ui/Accounts'
// import AddTransaction from '@/entities/transaction/ui/AddTransaction'
import FinancialReport from '@/widgets/FinancialReport'

function MainPage() {
    return (
        <div className="container mx-auto">
            <div className="flex gap-x-10">
                <div className="w-72">
                    <Accounts></Accounts>
                    {/* <div className="mt-5">
                        <AddTransaction></AddTransaction>
                    </div> */}
                </div>
                <div className="flex-1 space-y-10">
                    <FinancialReport></FinancialReport>
                    {/* <TransactionsTable></TransactionsTable> */}
                </div>
            </div>
        </div>
    )
}

export default MainPage
