import Portal from '@/shared/components/Portal'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import Login from './Login'

function AuthController() {
    return (
        <>
            <Portal>
                <ModalOpacity>
                    <Login />
                </ModalOpacity>
            </Portal>
        </>
    )
}

export default AuthController
