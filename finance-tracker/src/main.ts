import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api')
    // Включаем глобальную валидацию для всех запросов
    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
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
