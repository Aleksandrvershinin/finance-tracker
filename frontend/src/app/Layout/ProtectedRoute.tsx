import { useAuth } from '@/entities/auth/lib/useAuth'
import Loading from '@/shared/components/Loading'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

function ProtectedRoute() {
    const location = useLocation()
    const { data: user, isLoading } = useAuth()

    if (!user && !isLoading) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (isLoading) return <Loading isShow={true} />

    if (!user) return null

    return <Outlet />
}

export default ProtectedRoute
