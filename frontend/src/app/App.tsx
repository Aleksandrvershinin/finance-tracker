import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import CurrencyList from '@/pages/currency/CurrencyList'
import Providers from './providers/Providers'
import Logout from '@/entities/auth/ui/Logout'
import NotFound from '@/shared/components/ui/NotFound'
import MainPage from '@/pages/main/MainPage'
import CategoriesPage from '@/pages/ctegory/CategoriesPage'
import TransactionsAndTransfers from '@/pages/TransactionsAndTransfers/TransactionsAndTransfers'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                {/* <h1 className="text-2xl font-semibold mb-4">Управление финансами</h1> */}
                <div className="my-5 flex items-center gap-x-4 container mx-auto">
                    <Link to="/">Домой</Link>
                    <Link to="/categories">Категории</Link>
                    <Link className="mr-auto" to="/transactions-and-transfers">
                        Операции
                    </Link>
                    <Logout></Logout>
                </div>
                <Routes>
                    {/* Главная страница */}
                    <Route path="/" element={<MainPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route
                        path="transactions-and-transfers"
                        element={<TransactionsAndTransfers />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Providers>
        </BrowserRouter>
    )
}

export default App
