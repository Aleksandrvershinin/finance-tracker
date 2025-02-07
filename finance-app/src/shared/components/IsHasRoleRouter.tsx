import { useUserStore } from '@/entities/user/lib/useUserStore'
import { TUser } from '@/entities/user/types/user.types'
import { Outlet } from 'react-router-dom'
import NotFound from './ui/NotFound'

type Props = {
    userRole: TUser['role']
}
const IsHasRoleRouter = ({ userRole }: Props) => {
    const user = useUserStore((state) => state.user)
    if (userRole !== user?.role) {
        return <NotFound></NotFound>
    }

    return <Outlet />
}

export default IsHasRoleRouter
