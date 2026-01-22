import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TGroupAccount } from "../types/groupAccount.types";
import { groupAccountApi } from "../api/groupAccount.api";
import { getErrorMessage } from "@/shared/lib/getErrorMessage";

export const useGroupAccountDeleteMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: TGroupAccount["id"]) => {
            return groupAccountApi.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(
                groupAccountApi.getGroupAccountListQueryOptions()
            );
        },
    });

    return {
        ...mutation,
        errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    };
};