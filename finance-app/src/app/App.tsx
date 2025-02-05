import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CurrencyList from '@/pages/currency/CurrencyList'
import Providers from './providers/Providers'
import Logout from '@/entities/auth/ui/Logout'
// import AccountList from '@/pages/account/AccountList'
// import AccountForm from '@/pages/account/AccountForm'
function App() {
    return (
        <BrowserRouter>
            <div className="container mx-auto p-4">
                {/* <h1 className="text-2xl font-semibold mb-4">Управление валютами</h1> */}
                <div className="mb-10 flex items-center gap-x-4">
                    <Logout></Logout>
                    <Link to="/currencies">Currencies</Link>
                    <Link to="/accounts">Счета</Link>
                </div>
                <Providers>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <h1 className="text-2xl font-semibold mb-4">
                                    Управление валютами
                                </h1>
                            }
                        />
                        <Route path="/currencies" element={<CurrencyList />} />
                        {/* <Route path="/accounts" element={<AccountList />} />
            <Route path="/accounts/add" element={<AccountForm />} /> */}
                    </Routes>
                </Providers>
            </div>
        </BrowserRouter>
    )
}

export default App
