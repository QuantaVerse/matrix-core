import { Controller, Get } from "@nestjs/common";
import { AdvisorSimService } from "./advisor.sim.service";
import { CustomLogger } from "../logger/custom.logger";

@Controller("advisor/simulation")
export class AdvisorSimController {
    constructor(private readonly simulationService: AdvisorSimService, private logger: CustomLogger) {
        this.logger.setContext(AdvisorSimController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.simulationService.getHello();
    }
}