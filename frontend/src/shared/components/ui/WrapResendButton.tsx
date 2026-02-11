import { useEffect, useState } from 'react'

interface ResendButtonProps {
    children: React.ReactNode
    nextSendAt: number | null
    renderWrap?: (timeLeftSec: number) => React.ReactNode
}

export const WrapResendButton = ({
    children,
    nextSendAt,
    renderWrap,
}: ResendButtonProps) => {
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
                renderWrap ? (
                    renderWrap(timeLeftSec)
                ) : (
                    <div className="text-blue-500 mx-auto">
                        Повторная отправка через {timeLeftSec} сек
                    </div>
                )
            ) : (
                children
            )}
        </>
    )
}
