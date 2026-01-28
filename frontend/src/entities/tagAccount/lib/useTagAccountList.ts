import { useQuery } from "@tanstack/react-query"
import { tagAccountApi } from "../api/tagAccount.api"


export const useTagAccountList = () => {
    return useQuery({
        ...tagAccountApi.getTagAccountListQueryOptions()
    })
}