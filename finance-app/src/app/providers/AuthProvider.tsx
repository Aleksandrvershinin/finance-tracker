import { useAuthStore } from '@/entities/auth/lib/useAuthStore'
import AuthController from '@/entities/auth/ui/AuthController'
import Loading from '@/shared/components/Loading'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function AuthProvider({ children }: Props) {
    const checkAuth = useAuthStore((state) => state.checkAuth)
    const isLoading = useAuthStore((state) => state.isLoadingCheckAuth)
    const isAuth = useAuthStore((state) => state.isAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return (
        <>
            {isAuth ? children : <AuthController />}
            <Loading isShow={isLoading}></Loading>
        </>
    )
}

export default AuthProvider
