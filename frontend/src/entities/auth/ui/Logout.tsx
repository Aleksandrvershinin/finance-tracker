import { useAuthStore } from '../lib/useAuthStore'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function Logout({ ...rest }: Props) {
    const logout = useAuthStore((state) => state.logout)
    return (
        <button {...rest} onClick={logout}>
            Выход
        </button>
    )
}

export default Logout
