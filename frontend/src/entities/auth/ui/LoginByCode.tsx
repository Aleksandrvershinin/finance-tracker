import { useAuthStore } from '../lib/useAuthStore'
import { ConfirmCodeEmail } from './ConfirmCodeEmail'
import { RequestCodeEmail } from './RequestCodeEmail'

export const LoginByCode = () => {
    const step = useAuthStore((s) => s.step)

    return step === 'request code' ? <RequestCodeEmail /> : <ConfirmCodeEmail />
}
