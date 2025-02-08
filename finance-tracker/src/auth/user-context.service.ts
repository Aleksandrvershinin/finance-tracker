// src/user-context.service.ts
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { AsyncLocalStorage } from 'node:async_hooks'

@Injectable()
export class UserContext {
    private readonly storage = new AsyncLocalStorage<{ user: any }>()

    // Метод для установки пользователя в контекст
    run(user: any, callback: () => void) {
        this.storage.run({ user }, callback)
    }

    // Метод для получения текущего пользователя
    getUser(): User | null {
        return this.storage.getStore()?.user
    }
}
