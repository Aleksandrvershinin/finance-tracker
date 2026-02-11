import { WrapResendButton } from '@/shared/components/ui/WrapResendButton'
import { useAuthStore } from '../../lib/useAuthStore'
import Button from '@/shared/components/ui/Button/Button'
import { useAuthRequestCodeEmailForm } from '../../lib/useAuthRequestCodeEmailForm'
import { useAuthRequestCodeEmail } from '../../lib/useAuthRequestCodeEmail'
import { WithRecaptcha } from '@/shared/types/WithRecaptcha'
import { TRequestCodeEmailForm } from '../../types/auth.types'
import { getErrorMessage } from '@/shared/lib/getErrorMessage'
import { showAlert } from '@/shared/components/MyAlert/showAlert'
import { ImSpinner2 } from 'react-icons/im'

export function ResendCodeButton() {
    const setNextSendAt = useAuthStore((s) => s.setNextSendAt)
    const { mutate: resendCode, isPending: isPendingResendCode } =
        useAuthRequestCodeEmail()
    const { handleSubmit: handleSubmitResendCode } =
        useAuthRequestCodeEmailForm()
    const nextSendAt = useAuthStore((s) => s.nextSendAt)

    const handleClickResendCode = async (
        data: WithRecaptcha<TRequestCodeEmailForm>,
    ) => {
        if (!data.email) return
        resendCode(data, {
            onSuccess(res) {
                if (res.success) {
                    setNextSendAt()
                }
            },
            onError(error) {
                const message = getErrorMessage(error)
                showAlert(message, 'error')
            },
        })
    }
    return (
        <WrapResendButton nextSendAt={nextSendAt}>
            <Button
                onClick={handleSubmitResendCode(handleClickResendCode)}
                disabled={isPendingResendCode}
                className="w-full flex items-center justify-center"
            >
                {isPendingResendCode && (
                    <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isPendingResendCode ? 'Отправка...' : 'Отправить код еще раз'}
            </Button>
        </WrapResendButton>
    )
}
