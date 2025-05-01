import { User } from '@prisma/client';
export declare class UserContext {
    private readonly storage;
    run(user: any, callback: () => void): void;
    getUser(): User | null;
}
