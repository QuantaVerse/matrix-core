import { HttpException, Injectable } from "@nestjs/common";

import { CustomLoggerService } from "./shared/services/logger.service";

@Injectable()
export class AppService {

    constructor(private _logger: CustomLoggerService) {
        this._logger.setContext(AppService.name);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getHello(): Promise<string> {
        return "Hello World!";
    }

    async getDelayedHello(): Promise<string> {
        await this.sleep(1000);
        return "Hello World!";
    }

    async getExceptionHello(): Promise<string> {
        this._logger.error("A make believe exception : To be ignored");
        throw new HttpException("Exceptional Hello World!", 500);
    }
}
