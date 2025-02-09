import { useAuthStore } from '../lib/useAuthStore'

function Logout() {
    const logout = useAuthStore((state) => state.logout)
    return <button onClick={logout}>Выход</button>
}

export default Logout
