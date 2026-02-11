import { useAuthStore } from '../lib/useAuthStore'
import { ConfirmCodeEmail } from './ConfirmCodeEmail/ConfirmCodeEmail'
import { RequestCodeEmailForm } from './RequestCodeEmailForm'

export const LoginByCode = () => {
    const step = useAuthStore((s) => s.step)

    return step === 'request code' ? (
        <RequestCodeEmailForm />
    ) : (
        <ConfirmCodeEmail />
    )
}
