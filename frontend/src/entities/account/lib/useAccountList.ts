import { useQuery } from '@tanstack/react-query'
import { accountApi } from '../api/account.api'

export const ACCOUNTS_QUERY_KEY = ['accounts']

export const useAccountList = () => {
    return useQuery({
        ...accountApi.getAccountListQueryOptions(),
        select: (data) => {
            return data.filter(item =>
                item.groupAccount?.isVisible !== false
            );
        },
    });
}