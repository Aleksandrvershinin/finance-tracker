import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCategory, TCategoryForm } from "../types/category.types";
import { categoryApi } from "../api/category.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";


export const useCategoryMutation = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (params: { data: TCategoryForm; id?: TCategory['id'] }) => {
            const { data, id } = params
            return id
                ? categoryApi.update(data, id)
                : categoryApi.store(data)
        },

        onSuccess: () => {
            queryClient.invalidateQueries(categoryApi.getCategoryListQueryOptions())
        },
    })
    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    }
}