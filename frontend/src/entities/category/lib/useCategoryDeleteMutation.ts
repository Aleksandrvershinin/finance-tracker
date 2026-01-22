import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCategory } from "../types/category.types";
import { categoryApi } from "../api/category.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";


export const useCategoryDeleteMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: TCategory["id"]) => {
            return categoryApi.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(
                categoryApi.getCategoryListQueryOptions()
            );
        },
    });

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    };
}