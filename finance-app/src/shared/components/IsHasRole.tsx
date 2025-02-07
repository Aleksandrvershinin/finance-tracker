import { useUserStore } from '@/entities/user/lib/useUserStore'
import { TUser } from '@/entities/user/types/user.types'

type Props = {
    children?: React.ReactNode
    userRole: TUser['role']
}

function IsHasRole({ userRole, children }: Props) {
    const user = useUserStore((state) => state.user)

    if (user?.role === userRole) {
        return <>{children}</>
    }
    return null
}

export default IsHasRole
