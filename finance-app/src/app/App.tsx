import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CurrencyList from '@/pages/currency/CurrencyList'
import Providers from './providers/Providers'
import Logout from '@/entities/auth/ui/Logout'
import IsHasRole from '@/shared/components/IsHasRole'
import NotFound from '@/shared/components/ui/NotFound'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                <div className="container mx-auto p-4">
                    {/* <h1 className="text-2xl font-semibold mb-4">Управление валютами</h1> */}
                    <div className="mb-10 flex items-center gap-x-4">
                        <Logout></Logout>
                        <Link to="/currencies">Currencies</Link>
                        <Link to="/accounts">Счета</Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<></>} />
                        <Route
                            path="/currencies"
                            element={
                                <IsHasRole userRole="ADMIN">
                                    <CurrencyList />
                                </IsHasRole>
                            }
                        />
                        <Route path="*" element={<NotFound></NotFound>} />
                    </Routes>
                </div>
            </Providers>
        </BrowserRouter>
    )
}

export default App
