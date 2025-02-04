import { useUserStore } from '@/entities/user/lib/useUserStore'

type Props = {
    children: React.ReactNode
}

function UserProvider({ children }: Props) {
    useUserStore((state) => state.user)
    return <>{children}</>
}

export default UserProvider
