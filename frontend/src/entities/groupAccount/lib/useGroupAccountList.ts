import { useQuery } from "@tanstack/react-query"
import { groupAccountApi } from "../api/groupAccount.api"


export const useGroupAccountList = () => {
    return useQuery({
        ...groupAccountApi.getGroupAccountListQueryOptions(),
    })
}