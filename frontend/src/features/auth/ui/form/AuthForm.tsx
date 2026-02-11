import MyForm from '@/shared/components/form/MyForm/MyForm'

type Props = {
    buttons: React.ReactNode
    fields: React.ReactNode[]
    title: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    error?: string
    footer?: React.ReactNode
    header?: React.ReactNode
}

function AuthForm({
    buttons,
    fields,
    title,
    onSubmit,
    error,
    footer,
    header,
}: Props) {
    return (
        <div className="fixed inset-0 overflow-auto flex flex-col items-center pt-20 bg-gray-100">
            <MyForm
                header={header}
                buttons={buttons}
                fields={fields}
                myTitle={title}
                handlerSubmit={onSubmit}
                error={error}
                footer={footer}
            ></MyForm>
        </div>
    )
}

export default AuthForm
