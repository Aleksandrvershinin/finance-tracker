import AuthProvider from './AuthProvider'
import DataProvider from './DataProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

type Props = { children: React.ReactNode }

function Providers({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <DataProvider>{children}</DataProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default Providers
