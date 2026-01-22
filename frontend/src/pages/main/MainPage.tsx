import Accounts from '@/entities/account/ui/Accounts'
import { FilterPanel } from '@/features/Filter/ui/FilterPanel/FilterPanel'
import FinancialReport from '@/widgets/FinancialReport'

function MainPage() {
    return (
        <div className="container mx-auto">
            <FilterPanel />
            <div className="flex flex-col items-center gap-10 mb-10 lg:flex-row-reverse lg:items-start ">
                <div className="lg:flex-1 w-full lg:w-auto">
                    <FinancialReport></FinancialReport>
                </div>
                <div className="w-full lg:w-auto lg:min-w-[300px] lg:max-w-[350px]">
                    <Accounts></Accounts>
                </div>
            </div>
        </div>
    )
}

export default MainPage
