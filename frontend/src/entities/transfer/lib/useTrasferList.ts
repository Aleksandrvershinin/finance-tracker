import { useQuery } from "@tanstack/react-query"
import { transferApi } from "../api/transfer.api"


export const useTrasferList = () => {
    return useQuery({ ...transferApi.getTransferListQueryOptions() })
}