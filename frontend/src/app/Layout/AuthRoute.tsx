import { useAuth } from '@/entities/auth/lib/useAuth'
import Loading from '@/shared/components/Loading'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthRoute() {
    const { data: user, isLoading } = useAuth()

    if (isLoading) return <Loading isShow={true} />

    if (user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
