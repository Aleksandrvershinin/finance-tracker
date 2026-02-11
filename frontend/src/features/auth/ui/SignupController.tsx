import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import Signup from './Signup'

function SignupController() {
    return (
        <>
            <Portal>
                <ModalOpacity>
                    <Signup />
                </ModalOpacity>
            </Portal>
        </>
    )
}

export default SignupController
