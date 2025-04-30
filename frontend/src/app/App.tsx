import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Providers from './providers/Providers'
import NotFound from '@/shared/components/ui/NotFound'
import MainPage from '@/pages/main/MainPage'
import CategoriesPage from '@/pages/ctegory/CategoriesPage'
import TransactionsAndTransfers from '@/pages/TransactionsAndTransfers/TransactionsAndTransfers'
import Menu from '@/widgets/Menu/Menu'
import AccountTagsPage from '@/pages/accountTags/AccountTagsPage'
function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Menu />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="account-tags" element={<AccountTagsPage />} />
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
