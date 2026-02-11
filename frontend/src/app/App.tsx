import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Providers from './providers/Providers'
import NotFound from '@/shared/components/ui/NotFound'
import MainPage from '@/pages/main/MainPage'
import CategoriesPage from '@/pages/ctegory/CategoriesPage'
import TransactionsAndTransfers from '@/pages/TransactionsAndTransfers/TransactionsAndTransfers'
import AccountTagsPage from '@/pages/accountTags/AccountTagsPage'
import AuthController from '@/features/auth/ui/AuthController'
import SignupController from '@/features/auth/ui/SignupController'
import { Layout } from './Layout/Layout'
import ProtectedRoute from './Layout/ProtectedRoute'
import { AuthRoute } from './Layout/AuthRoute'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Routes>
                    <Route element={<AuthRoute />}>
                        <Route path="/login" element={<AuthController />} />
                        <Route path="/signup" element={<SignupController />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="categories"
                                element={<CategoriesPage />}
                            />
                            <Route
                                path="account-groups"
                                element={<AccountTagsPage />}
                            />
                            <Route
                                path="transactions-and-transfers"
                                element={<TransactionsAndTransfers />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Providers>
        </BrowserRouter>
    )
}

export default App
