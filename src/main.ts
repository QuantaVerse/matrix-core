import { NestFactory } from "@nestjs/core";
import { MatrixCoreModule } from "./matrix.core.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoggerService } from "@nestjs/common/services/logger.service";
import { CustomLogger } from "./logger/custom.logger";

async function bootstrap() {
    const customLogger: LoggerService = new CustomLogger();

    const app = await NestFactory.create<NestFastifyApplication>(
        MatrixCoreModule,
        new FastifyAdapter(),
        {
            logger: customLogger
        }
    );
    app.useLogger(customLogger);

    const options = new DocumentBuilder()
        .setTitle("Matrix Core")
        .setDescription("All OpenAPI specs for Matrix Core")
        .setVersion("0.0.1")
        .addTag("matrix")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("swagger", app, document);

    // By default, Fastify listens only on the localhost 127.0.0.1 interface (read more).
    // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call
    await app.listen(3000, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().then(() => {
    console.log(`Bootstrap completed : MatrixCoreModule loaded`);
});
