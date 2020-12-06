import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { LoggerService } from "./shared/services/logger.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private logger: LoggerService) {
        this.logger.setContext(AppController.name);
    }

    @Get("/health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.appService.getHello();
    }
}
