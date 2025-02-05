import ModalOpacity from '../ModalOpacity'
import Portal from '../Portal'
import Spiner from './Spiner'

type Props = {
    isShow?: boolean
}

function Loading({ isShow = true }: Props) {
    return (
        <Portal>
            <ModalOpacity isOpen={isShow}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spiner className="!w-20 !h-20"></Spiner>
                </div>
            </ModalOpacity>
        </Portal>
    )
}

export default Loading
