import { TTagAccount } from "@/entities/tagAccount/types/tagAccount.types"
import { TAccount } from "../types/account.types"
interface TagSum extends TTagAccount {
    total: number
};
export function useAccountsByTag(accounts: TAccount[]) {
    const map = new Map<number, TagSum>()
    for (const account of accounts) {
        const tag = account.accountTag;
        if (!tag) continue;
        if (!map.has(tag.id)) {
            map.set(tag.id, {
                ...tag,
                total: 0,
            });
        }

        map.get(tag.id)!.total += account.balance;
    }
    return Array.from(map.values());
}