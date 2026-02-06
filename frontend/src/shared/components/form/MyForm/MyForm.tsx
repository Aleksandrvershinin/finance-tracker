import clsx from 'clsx'
import CancelIcon from '../../ui/icons/CancelIcon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    buttons: React.ReactNode
    fields: React.ReactNode[]
    handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    error?: string | null
    myTitle?: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
    hadleClose?: () => void
}

function MyForm(props: Props) {
    const {
        buttons,
        fields,
        myTitle,
        handlerSubmit,
        error,
        header,
        footer,
        className,
        hadleClose,
        ...rest
    } = props
    const classes = clsx(className, 'bg-white p-4 rounded-lg shadow-2xl w-96')
    return (
        <div className={classes} {...rest}>
            <button onClick={hadleClose} className="ml-auto w-6 block">
                <CancelIcon></CancelIcon>
            </button>
            <div className="p-4">
                <h2 className="mt- text-3xl font-semibold mb-6 text-center">
                    {myTitle}
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-6">{error}</p>
                )}
                {header}
                <form onSubmit={handlerSubmit} className="flex flex-col gap-4">
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={index}>{field}</div>
                        ))}
                    </div>
                    {buttons}
                </form>
                {footer && footer}
            </div>
        </div>
    )
}

export default MyForm
