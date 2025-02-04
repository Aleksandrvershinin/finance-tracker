import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import StoresProvider from './providers/StoresProvider'
import CurrencyList from '@/pages/currency/CurrencyList'
// import AccountList from '@/pages/account/AccountList'
// import AccountForm from '@/pages/account/AccountForm'
function App() {
    return (
        <BrowserRouter>
            <StoresProvider>
                <div className="container mx-auto p-4">
                    {/* <h1 className="text-2xl font-semibold mb-4">Управление валютами</h1> */}
                    <div className="mb-10 flex items-center gap-x-4">
                        <Link to="/currencies">Currencies</Link>
                        <Link to="/accounts">Accounts</Link>
                    </div>
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
                </div>
            </StoresProvider>
        </BrowserRouter>
    )
}

export default App
