import AuthProvider from './AuthProvider'
import DataProvider from './DataProvider'

type Props = { children: React.ReactNode }

function Providers({ children }: Props) {
    return (
        <DataProvider>
            <AuthProvider>{children}</AuthProvider>
        </DataProvider>
    )
}

export default Providers
