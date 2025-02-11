import AuthProvider from './AuthProvider'
import DataProvider from './DataProvider'

type Props = { children: React.ReactNode }

function Providers({ children }: Props) {
    return (
        <AuthProvider>
            <DataProvider>{children}</DataProvider>
        </AuthProvider>
    )
}

export default Providers
