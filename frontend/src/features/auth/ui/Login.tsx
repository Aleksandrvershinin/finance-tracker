import { LoginByCode } from './LoginByCode'
import { LoginByPass } from './LoginByPass'
import { useQuery } from '@/shared/lib/hooks/useQuery'

const Login = () => {
    const query = useQuery()
    const method = query.get('method') || 'pass'

    return <>{method === 'pass' ? <LoginByPass /> : <LoginByCode />}</>
}

export default Login
