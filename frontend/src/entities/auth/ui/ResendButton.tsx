import { useEffect, useState } from 'react'
import { useAuthStore } from '../lib/useAuthStore'

interface ResendButtonProps {
    children: React.ReactNode
}

export const ResendButton = ({ children }: ResendButtonProps) => {
    const nextSendAt = useAuthStore((s) => s.nextSendAt)
    const [, forceUpdate] = useState(0)

    const timeLeftMs = nextSendAt ? Math.max(0, nextSendAt - Date.now()) : 0

    const timeLeftSec = Math.ceil(timeLeftMs / 1000)
    const isDisabled = timeLeftSec > 0

    useEffect(() => {
        if (!isDisabled) return

        const id = setInterval(() => {
            forceUpdate((v) => v + 1)
        }, 1000)

        return () => clearInterval(id)
    }, [isDisabled])

    return (
        <>
            {isDisabled ? (
                <div className="text-blue-500 mx-auto">
                    Повторная отправка через {timeLeftSec} сек
                </div>
            ) : (
                children
            )}
        </>
    )
}
