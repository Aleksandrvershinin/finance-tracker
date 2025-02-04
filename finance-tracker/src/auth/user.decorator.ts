// src/auth/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): User => {
        // Типизируем возвращаемое значение как User
        const request = ctx.switchToHttp().getRequest()
        return request.user // Возвращаем user с типом User
    },
)
