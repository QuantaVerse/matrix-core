import { Controller, Get, Post } from "@nestjs/common";
import { CustomLogger } from "../logger/custom.logger";
import { AdvisorService } from "./advisor.service";

@Controller("advisor")
export class AdvisorController {
    constructor(private readonly advisorService: AdvisorService, private logger: CustomLogger) {
        this.logger.setContext(AdvisorController.name);
    }

    @Get("health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.advisorService.getHello();
    }
}