import AuthProvider from './AuthProvider'
import CurrencyStoreProvider from './CurrencyStoreProvider'

type Props = { children: React.ReactNode }

function Providers({ children }: Props) {
    return (
        <AuthProvider>
            <CurrencyStoreProvider>{children}</CurrencyStoreProvider>
        </AuthProvider>
    )
}

export default Providers
