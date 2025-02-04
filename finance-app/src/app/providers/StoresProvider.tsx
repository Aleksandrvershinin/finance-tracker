import CurrencyStoreProvider from './StoresProvider/CurrencyStoreProvider'

type Props = {
  children: React.ReactNode
}

function StoresProvider({ children }: Props) {
  return <CurrencyStoreProvider>{children}</CurrencyStoreProvider>
}

export default StoresProvider
