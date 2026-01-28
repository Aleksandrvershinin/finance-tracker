import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";
import { TTagAccount } from "../types/tagAccount.types";
import { tagAccountApi } from "../api/tagAccount.api";

export const useTagAccountDeleteMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: TTagAccount["id"]) => {
            return tagAccountApi.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(
                tagAccountApi.getTagAccountListQueryOptions()
            );
        },
    });

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    };
};