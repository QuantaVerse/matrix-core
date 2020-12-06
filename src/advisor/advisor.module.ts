import { Module } from "@nestjs/common";
import { AdvisorService } from "./advisor.service";
import { AdvisorController } from "./advisor.controller";

@Module({
    imports: [],
    controllers: [AdvisorController],
    providers: [AdvisorService]
})
export class AdvisorModule {}
