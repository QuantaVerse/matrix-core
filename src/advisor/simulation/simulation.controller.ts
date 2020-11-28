import { Controller, Get } from "@nestjs/common";
import { SimulationService } from "./simulation.service";
import { CustomLogger } from "../../logger/custom.logger";

@Controller("advisor/simulation")
export class SimulationController {
    constructor(private readonly simulationService: SimulationService, private logger: CustomLogger) {
        this.logger.setContext(SimulationController.name);
    }

    @Get("/health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.simulationService.getHello();
    }
}