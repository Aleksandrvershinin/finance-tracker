type Props = {
    buttons: React.ReactNode[]
    fields: React.ReactNode[]
    title: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    error?: string
    footer?: React.ReactNode
}

function AuthForm({ buttons, fields, title, onSubmit, error, footer }: Props) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center">
                    {title}
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-6">{error}</p>
                )}
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={index}>{field}</div>
                        ))}
                    </div>
                    {buttons.map((btn, index) => (
                        <div key={index}>{btn}</div>
                    ))}
                </form>
                {footer && footer}
            </div>
        </div>
    )
}

export default AuthForm
