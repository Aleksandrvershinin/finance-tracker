import { useAuth } from '@/entities/auth/lib/useAuth'
import { TUser } from '@/entities/user/types/user.types'

type Props = {
    children?: React.ReactNode
    userRole: TUser['role']
}

function IsHasRole({ userRole, children }: Props) {
    const { data: user } = useAuth()

    if (user?.role === userRole) {
        return <>{children}</>
    }
    return null
}

export default IsHasRole
