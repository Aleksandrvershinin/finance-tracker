"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const class_validator_1 = require("class-validator");
const validation_messages_1 = require("./validators/validation-messages");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
            console.error('Ошибки валидации:', errors);
            throw new common_1.BadRequestException(errors.flatMap((err) => err.constraints
                ? Object.entries(err.constraints).map(([key, value]) => validation_messages_1.VALIDATION_MESSAGES[key.toUpperCase()] ||
                    value)
                : ['Неизвестная ошибка']));
        },
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.enableCors({
        origin: ['http://localhost', 'http://localhost:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map