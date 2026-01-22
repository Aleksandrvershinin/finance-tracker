import { TUser } from '@/entities/user/types/user.types'
import { Outlet } from 'react-router-dom'
import NotFound from './ui/NotFound'
import { useAuth } from '@/entities/auth/lib/useAuth'

type Props = {
    userRole: TUser['role']
}
const IsHasRoleRouter = ({ userRole }: Props) => {
    const { data: user } = useAuth()
    if (userRole !== user?.role) {
        return <NotFound></NotFound>
    }

    return <Outlet />
}

export default IsHasRoleRouter
