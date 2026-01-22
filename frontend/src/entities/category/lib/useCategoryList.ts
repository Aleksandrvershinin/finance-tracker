import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "../api/category.api"


export const useCategoryList = () => {
    return useQuery({
        ...categoryApi.getCategoryListQueryOptions(),
    })
}