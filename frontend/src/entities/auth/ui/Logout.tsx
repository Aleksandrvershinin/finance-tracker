import { useLogout } from '../lib/useAuth'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function Logout({ ...rest }: Props) {
    const { mutate, isPending } = useLogout()
    return (
        <button {...rest} onClick={() => mutate()} disabled={isPending}>
            Выход
        </button>
    )
}

export default Logout
