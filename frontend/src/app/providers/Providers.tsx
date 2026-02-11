import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const queryClient = new QueryClient()

type Props = { children: React.ReactNode }

function Providers({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <GoogleReCaptchaProvider
                language="ru"
                reCaptchaKey="6LdPhWUsAAAAACH_Cth2sq0_6ehQll5VI2RK27ss"
            >
                {children}
            </GoogleReCaptchaProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default Providers
