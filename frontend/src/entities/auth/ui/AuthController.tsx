import Portal from '@/shared/components/Portal'
import { TTypeComponent } from '../types/auth.types'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import { useAuthStore } from '../lib/useAuthStore'
import { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

type Props = {
    commponent?: TTypeComponent
}

function AuthController({ commponent = 'login' }: Props) {
    const typeComponent = useAuthStore((state) => state.typeComponent)
    const setComponent = useAuthStore((state) => state.setComponent)
    useEffect(() => {
        setComponent(commponent)
    }, [setComponent, commponent])
    const render = () => {
        if (typeComponent === 'login') {
            return <Login></Login>
        } else if (typeComponent === 'signup') {
            return <Signup></Signup>
        } else {
            return null
        }
    }

    return (
        <>
            <Portal>
                <ModalOpacity>{render()}</ModalOpacity>
            </Portal>
        </>
    )
}

export default AuthController
