import { Module } from "@nestjs/common";
import { AdvisorService } from "./advisor.service";
import { AdvisorController } from "./advisor.controller";
import { LoggerModule } from "../logger/logger.module";

@Module({
    imports: [LoggerModule],
    controllers: [AdvisorController],
    providers: [AdvisorService]
})
export class AdvisorModule {}
