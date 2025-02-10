import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'
import { VALIDATION_MESSAGES } from './validators/validation-messages'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    // Включаем глобальную валидацию для всех запросов
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Удаляет лишние поля
            transform: true, // Автоматически преобразует входные данные в DTO-класс
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                console.error('Ошибки валидации:', errors) // Логируем ошибки
                throw new BadRequestException(
                    errors.flatMap((err) =>
                        err.constraints
                            ? Object.entries(err.constraints).map(
                                  ([key, value]) =>
                                      VALIDATION_MESSAGES[key.toUpperCase()] ||
                                      value,
                              )
                            : ['Неизвестная ошибка'],
                    ),
                )
            },
        }),
    )
    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    // Включаем CORS с определенным источником
    app.enableCors({
        origin: 'http://localhost:5173', // Указываете адрес вашего фронтенда
        methods: 'GET,POST,PUT,DELETE', // Указываете разрешенные методы
        allowedHeaders: 'Content-Type, Authorization', // Разрешенные заголовки
    })
    await app.listen(3000)
}
bootstrap()
