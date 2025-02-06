import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CurrencyList from '@/pages/currency/CurrencyList'
import Providers from './providers/Providers'
import Logout from '@/entities/auth/ui/Logout'
import IsHasRole from '@/shared/components/IsHasRole'
import NotFound from '@/shared/components/ui/NotFound'
import MainPage from '@/pages/main/MainPage'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                {/* <h1 className="text-2xl font-semibold mb-4">Управление финансами</h1> */}
                <div className="mb-10 flex items-center gap-x-4 container mx-auto">
                    <Logout></Logout>
                    {/* <Link to="/currencies">Currencies</Link>
                        <Link to="/accounts">Счета</Link> */}
                </div>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="*" element={<NotFound></NotFound>} />
                </Routes>
                <IsHasRole userRole="ADMIN">
                    <Routes>
                        <Route path="/currencies" element={<CurrencyList />} />
                    </Routes>
                </IsHasRole>
            </Providers>
        </BrowserRouter>
    )
}

export default App
