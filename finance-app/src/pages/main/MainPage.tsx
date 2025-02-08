import Accounts from '@/entities/account/ui/Accounts'
import AddTransaction from '@/entities/transaction/ui/addTransaction'

function MainPage() {
    return (
        <div className="container mx-auto">
            <div className="w-72">
                <Accounts></Accounts>
                <div className="mt-5">
                    <AddTransaction></AddTransaction>
                </div>
            </div>
        </div>
    )
}

export default MainPage
