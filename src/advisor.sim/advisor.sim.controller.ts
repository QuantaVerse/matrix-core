import { Controller, Get } from "@nestjs/common";
import { AdvisorSimService } from "./advisor.sim.service";
import { LoggerService } from "../shared/services/logger.service";

@Controller("advisor/simulation")
export class AdvisorSimController {
    constructor(private readonly simulationService: AdvisorSimService, private logger: LoggerService) {
        this.logger.setContext(AdvisorSimController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.simulationService.getHello();
    }
}