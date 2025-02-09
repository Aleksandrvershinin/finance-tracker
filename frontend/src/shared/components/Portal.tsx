import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
    children: React.ReactNode
    containerId?: string
}

const Portal: React.FC<PortalProps> = ({ children, containerId }) => {
    const [container, setContainer] = useState<HTMLElement | null>(null)

    useEffect(() => {
        if (containerId) {
            let portalContainer = document.getElementById(containerId)
            if (!portalContainer) {
                portalContainer = document.createElement('div')
                portalContainer.id = containerId
                document.body.appendChild(portalContainer)
            }
            setContainer(portalContainer)
        } else {
            setContainer(document.body)
        }

        return () => {
            if (containerId && container && container.childNodes.length === 0) {
                container.remove()
            }
        }
    }, [containerId, container])

    return container ? createPortal(children, container) : null
}

export default Portal
