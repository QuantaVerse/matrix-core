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

    exceptionalHello(hello?: string): string {
        if(hello) {
            return hello;
        } else {
            throw new Error("Exceptional Hello World!");
        }
    }

    async getExceptionHello(): Promise<string> {
        try {
            return this.exceptionalHello();
        } catch (e) {
            this._logger.track("A make believe exception : To be ignored", e);
            throw new HttpException(e.toString(), 500);
        }
    }
}
