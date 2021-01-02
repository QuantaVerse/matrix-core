import { Module } from "@nestjs/common";

import { AdvisorController } from "./advisor.controller";
import { AdvisorService } from "./advisor.service";

@Module({
    imports: [],
    controllers: [AdvisorController],
    providers: [AdvisorService]
})
export class AdvisorModule {}
