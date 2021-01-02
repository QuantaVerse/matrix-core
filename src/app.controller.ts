import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { CustomLoggerService } from "./shared/services/logger.service";

@Controller()
export class AppController {
    constructor(private readonly _appService: AppService, private _logger: CustomLoggerService) {
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
}
