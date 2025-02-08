import clsx from 'clsx'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    buttons: React.ReactNode
    fields: React.ReactNode[]
    title?: string
    handlerSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    error?: string | null
    footer?: React.ReactNode
}

function MyForm(props: Props) {
    const {
        buttons,
        fields,
        title,
        handlerSubmit,
        error,
        footer,
        className,
        ...rest
    } = props
    const classes = clsx(className, 'bg-white p-8 rounded-lg shadow-2xl w-96')
    return (
        <div className={classes} {...rest}>
            <h2 className="text-3xl font-semibold mb-6 text-center">{title}</h2>
            {error && <p className="text-red-500 text-center mb-6">{error}</p>}
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
    )
}

export default MyForm
