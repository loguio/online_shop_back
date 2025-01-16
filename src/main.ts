import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { AtGuard } from "./auth/auth.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const reflector = app.get(Reflector);
    app.useGlobalGuards(new AtGuard(reflector));
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            validateCustomDecorators: true,
            stopAtFirstError: false,
        }),
    );
    app.enableCors({ origin: "http://localhost:5173" });

    const config = new DocumentBuilder()
        .setTitle("Juror Manager")
        .setDescription("List of api available")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(3000);
}
bootstrap();
