// src/auth/roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtAuthGuard } from './jwt-auth.guard' // Импортируем существующий Guard для JWT аутентификации

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        super() // Инициализируем родительский Guard (JwtAuthGuard)
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        ) // Получаем роли из метаданных

        if (!requiredRoles) {
            return true // Если нет ролей, доступ открыт
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user // Получаем пользователя из запроса

        if (!user) {
            throw new ForbiddenException('User not found')
        }

        // Проверяем, есть ли у пользователя требуемая роль
        const hasRole = requiredRoles.some(
            (role) => user.role.toLowerCase() === role.toLowerCase(),
        )
        if (!hasRole) {
            throw new ForbiddenException('You do not have the required role')
        }

        return true // Если роль совпадает, доступ разрешен
    }
}
