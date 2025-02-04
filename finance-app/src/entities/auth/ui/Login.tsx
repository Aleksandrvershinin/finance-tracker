import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../lib/useAuthStore'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await login(email, password)
        if (success) navigate('/')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl mb-4">Авторизация</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Login
