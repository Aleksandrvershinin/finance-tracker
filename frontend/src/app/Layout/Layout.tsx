import { Outlet } from 'react-router-dom'
import Menu from '../../widgets/Menu/Menu'
import DataLoading from '@/app/Layout/DataLoading'

export const Layout = () => {
    return (
        <>
            <DataLoading />
            <nav>
                <Menu />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}
