import { createRoot } from 'react-dom/client'
import MyAlert from './MyAlert'

type AlertType = 'error' | 'success'

export function showAlert(text: string, type: AlertType) {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)

    const handleClose = () => {
        root.unmount()
        container.remove()
    }

    root.render(
        <MyAlert text={text} type={type} onCloseCallback={handleClose} />,
    )
}
