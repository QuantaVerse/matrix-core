import { Controller, Get } from "@nestjs/common";

import { CustomLoggerService } from "../shared/services/logger.service";
import { AdvisorSimService } from "./advisor.sim.service";

@Controller("advisor/simulation")
export class AdvisorSimController {
    constructor(private readonly simulationService: AdvisorSimService, private logger: CustomLoggerService) {
        this.logger.setContext(AdvisorSimController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.simulationService.getHello();
    }
}