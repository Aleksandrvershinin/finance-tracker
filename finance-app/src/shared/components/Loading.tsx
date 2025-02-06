import { AnimatePresence } from 'framer-motion'
import ModalOpacity from './ui/ModalOpacity'
import Portal from './Portal'
import Spiner from './ui/Spiner'

type Props = {
    isShow?: boolean
}

function Loading({ isShow = true }: Props) {
    return (
        <AnimatePresence>
            {isShow && (
                <Portal>
                    <ModalOpacity>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <Spiner className="!w-20 !h-20"></Spiner>
                        </div>
                    </ModalOpacity>
                </Portal>
            )}
        </AnimatePresence>
    )
}

export default Loading
