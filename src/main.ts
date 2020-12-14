import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import helmet from "fastify-helmet";
import fastifyRateLimit from "fastify-rate-limit";
import * as morgan from "morgan";

import { AppModule } from "./app.module";
import { EnvironmentEnum } from "./common/enums/environment.enum";
import { fetchMorganOptions, MORGAN_CUSTOM_FORMAT } from "./config/logging/morgan.config";
import { fetchCORSOptions } from "./config/security/cors.config";
import { fetchHelmetOptions } from "./config/security/helmet.config";
import { fetchRateLimiterOptions } from "./config/security/rate.limiter.config";
import { setupSwagger } from "./config/swagger/swagger.setup";
import { APPLICATION_START_TIMER_STRING } from "./constants/app.constants";
import { ConfigService } from "./shared/services/config.service";
import { CustomLoggerService } from "./shared/services/logger.service";
import { SharedModule } from "./shared/shared.module";

console.time(APPLICATION_START_TIMER_STRING);

async function bootstrap() {
    console.log(`Starting application bootstrap`);

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        cors: fetchCORSOptions()
    });

    const configService = app.select(SharedModule).get(ConfigService);
    const loggerService = await app.select(SharedModule).resolve(CustomLoggerService);

    // common logger middleware
    app.useLogger(loggerService);
    // HTTP request logger middleware
    app.use(morgan(`${MORGAN_CUSTOM_FORMAT}`, fetchMorganOptions(loggerService)));

    // add helmet security via Fastify plugin
    await app.register(helmet, fetchHelmetOptions());
    // brute force protection via Fastify plugin
    await app.register(fastifyRateLimit, fetchRateLimiterOptions());

    if ([EnvironmentEnum.Development, EnvironmentEnum.Staging].includes(configService.nodeEnv)) {
        setupSwagger(app, configService.swaggerConfig);
    }

    // By default, Fastify listens only on the localhost 127.0.0.1 interface (read more).
    // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call
    const port = configService.getNumber("PORT") || 3000;
    const host = configService.get("HOST") || "127.0.0.1";
    await app.listen(port, host);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then(() => {
    console.log(`Bootstrap completed : AppModule loaded`);
    console.timeEnd(APPLICATION_START_TIMER_STRING);
});
