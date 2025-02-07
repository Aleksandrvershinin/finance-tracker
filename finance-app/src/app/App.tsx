import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import CurrencyList from '@/pages/currency/CurrencyList'
import Providers from './providers/Providers'
import Logout from '@/entities/auth/ui/Logout'
import IsHasRole from '@/shared/components/IsHasRole'
import NotFound from '@/shared/components/ui/NotFound'
import MainPage from '@/pages/main/MainPage'
import IsHasRoleRouter from '@/shared/components/IsHasRoleRouter'
import CategoryRouter from '@/pages/ctegory/CategoryRouter'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                {/* <h1 className="text-2xl font-semibold mb-4">Управление финансами</h1> */}
                <div className="mb-10 flex items-center gap-x-4 container mx-auto">
                    <Link to="/">Домой</Link>
                    <Logout></Logout>
                    <IsHasRole userRole="ADMIN">
                        <Link to="/categories">Категории</Link>
                    </IsHasRole>
                </div>
                <Routes>
                    {/* Главная страница */}
                    <Route path="/" element={<MainPage />} />

                    {/* Ограниченный доступ (ADMIN) */}
                    <Route element={<IsHasRoleRouter userRole="ADMIN" />}>
                        <Route path="currencies" element={<CurrencyList />} />
                        <Route
                            path="categories/*"
                            element={<CategoryRouter />}
                        />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Providers>
        </BrowserRouter>
    )
}

export default App
