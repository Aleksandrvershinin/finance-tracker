import { useUserStore } from '@/entities/user/lib/useUserStore'
import { TUser } from '@/entities/user/types/user.types'
import NotFound from './ui/NotFound'

type Props = {
    children: React.ReactNode
    userRole: TUser['role']
}

function IsHasRole({ userRole, children }: Props) {
    const user = useUserStore((state) => state.user)
    console.log(user?.role)

    if (user?.role === userRole) {
        return <>{children}</>
    }
    return <NotFound></NotFound>
}

export default IsHasRole
