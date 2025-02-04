import CurrencyStoreProvider from './CurrencyStoreProvider'

type Props = {
    children: React.ReactNode
}

function StoresProvider({ children }: Props) {
    return <CurrencyStoreProvider>{children}</CurrencyStoreProvider>
}

export default StoresProvider
