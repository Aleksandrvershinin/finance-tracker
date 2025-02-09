import { Route, Routes } from 'react-router-dom'
import CategoriesPage from './CategoriesPage'

function CategoryRouter() {
    return (
        <Routes>
            <Route index element={<CategoriesPage />} />
        </Routes>
    )
}

export default CategoryRouter
