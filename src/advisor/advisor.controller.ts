import { Controller, Get } from "@nestjs/common";
import { LoggerService } from "../shared/services/logger.service";
import { AdvisorService } from "./advisor.service";

@Controller("advisor")
export class AdvisorController {
    constructor(private readonly advisorService: AdvisorService, private logger: LoggerService) {
        this.logger.setContext(AdvisorController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.advisorService.getHello();
    }
}