import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CurrencyList from '@/pages/currency/CurrencyList'
import StoresProvider from './providers/StoresProvider/StoresProvider'
import AuthProvider from './providers/StoresProvider/AuthProvider'
// import AccountList from '@/pages/account/AccountList'
// import AccountForm from '@/pages/account/AccountForm'
function App() {
    return (
        <BrowserRouter>
            <div className="container mx-auto p-4">
                {/* <h1 className="text-2xl font-semibold mb-4">Управление валютами</h1> */}
                <div className="mb-10 flex items-center gap-x-4">
                    <Link to="/currencies">Currencies</Link>
                    <Link to="/accounts">Accounts</Link>
                </div>
                <AuthProvider>
                    <StoresProvider>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <h1 className="text-2xl font-semibold mb-4">
                                        Управление валютами
                                    </h1>
                                }
                            />
                            <Route
                                path="/currencies"
                                element={<CurrencyList />}
                            />
                            {/* <Route path="/accounts" element={<AccountList />} />
            <Route path="/accounts/add" element={<AccountForm />} /> */}
                        </Routes>
                    </StoresProvider>
                </AuthProvider>
            </div>
        </BrowserRouter>
    )
}

export default App
