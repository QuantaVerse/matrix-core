import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { HealthCheckResult } from "@nestjs/terminus/dist/health-check/health-check-result.interface";

import { AppService } from "./app.service";
import { CustomLoggerService } from "./shared/services/logger.service";

@Controller()
export class AppController {
    constructor(
        private readonly _appService: AppService,
        private _logger: CustomLoggerService,
        private healthCheckService: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private db: TypeOrmHealthIndicator
    ) {
        this._logger.setContext(AppController.name);
    }

    @Get("/hello")
    getHello(): Promise<string> {
        this._logger.debug(`getHello`);
        return this._appService.getHello();
    }

    @Get("/hello/delayed")
    getDelayedHello(): Promise<string> {
        this._logger.debug(`getDelayedHello`);
        return this._appService.getDelayedHello();
    }

    @Get("/hello/exception")
    getExceptionHello(): Promise<string> {
        this._logger.debug(`getExceptionHello`);
        return this._appService.getExceptionHello();
    }

    @Get("/isUp")
    isUp(): boolean {
        this._logger.debug(`isUp`);
        return true;
    }

    @Get("/health")
    @HealthCheck()
    readiness(): Promise<HealthCheckResult> {
        this._logger.debug(`readiness`);
        return this.healthCheckService.check([
            async () => this.db.pingCheck("typeorm", { timeout: 300 }),
            async () => this.memory.checkHeap("memory_heap", 200 * 1024 * 1024),
            async () => this.memory.checkRSS("memory_rss", 3000 * 1024 * 1024)
        ]);
    }
}
