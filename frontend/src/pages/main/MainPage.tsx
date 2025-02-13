import Accounts from '@/entities/account/ui/Accounts'
import FinancialReport from '@/widgets/FinancialReport'

function MainPage() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center gap-10 mb-10 lg:flex-row-reverse lg:items-start ">
                <div className="lg:flex-1 w-full lg:w-auto">
                    <FinancialReport></FinancialReport>
                </div>
                <div className="w-full lg:w-auto">
                    <Accounts></Accounts>
                </div>
            </div>
        </div>
    )
}

export default MainPage
