import { useAuthStore } from '../lib/useAuthStore'

function Logout() {
    const logout = useAuthStore((state) => state.logout)
    return <button onClick={logout}>Logout</button>
}

export default Logout
