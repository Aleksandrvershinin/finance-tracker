import { useAuthStore } from '@/entities/auth/lib/useAuthStore'
import Login from '@/entities/auth/ui/Login'
import { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

function AuthProvider({ children }: Props) {
    const checkAuth = useAuthStore((state) => state.checkAuth)
    const isAuth = useAuthStore((state) => state.isAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (!isAuth) {
        return <Login />
    }

    return <>{children}</>
}

export default AuthProvider
