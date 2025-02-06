import Portal from '@/shared/components/Portal'
import { TTypeComponent } from '../types/auth.types'
import ModalOpacity from '@/shared/components/ui/ModalOpacity'
import Loading from '@/shared/components/Loading'
import { useAuthStore } from '../lib/useAuthStore'
import { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'

type Props = {
    commponent?: TTypeComponent
}

function AuthController({ commponent = 'login' }: Props) {
    const isLoadingLogin = useAuthStore((state) => state.isLoadingLogin)
    const isLoadingSignup = useAuthStore((state) => state.isLoadingSignup)
    const typeCommponent = useAuthStore((state) => state.typeComponent)
    const setComponent = useAuthStore((state) => state.setComponent)
    useEffect(() => {
        setComponent(commponent)
    }, [setComponent, commponent])
    const isLoading = isLoadingSignup || isLoadingLogin
    const render = () => {
        if (typeCommponent === 'login') {
            return <Login></Login>
        } else if (typeCommponent === 'signup') {
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
            <Loading isShow={isLoading} />
        </>
    )
}

export default AuthController
