import { useAuthStore } from '@/entities/auth/lib/useAuthStore'
import Login from '@/entities/auth/ui/Login'
import Loading from '@/shared/components/ui/Loading'
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
            {!isLoading && isAuth && children}
            <Loading isShow={isLoading}></Loading>
            <Login isShow={!isLoading && !isAuth} />
        </>
    )
}

export default AuthProvider
