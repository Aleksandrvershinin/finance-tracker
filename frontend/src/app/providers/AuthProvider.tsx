import { useAuth } from '@/entities/auth/lib/useAuth'
import AuthController from '@/entities/auth/ui/AuthController'
import Loading from '@/shared/components/Loading'

type Props = {
    children: React.ReactNode
}

function AuthProvider({ children }: Props) {
    const { data: user, isLoading } = useAuth()

    return (
        <>
            {user ? children : <AuthController />}
            <Loading isShow={isLoading} />
        </>
    )
}

export default AuthProvider
