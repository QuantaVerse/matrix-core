import { Controller, Get } from "@nestjs/common";

import { CustomLoggerService } from "../../shared/services/logger.service";
import { AdvisorService } from "./advisor.service";

@Controller("advisor/v1")
export class AdvisorController {
    constructor(private readonly advisorService: AdvisorService, private logger: CustomLoggerService) {
        this.logger.setContext(AdvisorController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.advisorService.getHello();
    }
}
