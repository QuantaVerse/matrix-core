import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { CustomLoggerService } from "./shared/services/logger.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private logger: CustomLoggerService) {
        this.logger.setContext(AppController.name);
    }

    @Get("/health")
    getHello(): Promise<string> {
        this.logger.log(`getHealth`);
        return this.appService.getHello();
    }
}
