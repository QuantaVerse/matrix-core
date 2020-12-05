import { Module } from "@nestjs/common";
import { MatrixCoreController } from "./matrix.core.controller";
import { MatrixCoreService } from "./matrix.core.service";
import { LoggerModule } from "./logger/logger.module";
import { AdvisorSimModule } from "./advisor.sim/advisor.sim.module";
import { AdvisorModule } from "./advisor/advisor.module";

@Module({
    imports: [LoggerModule, AdvisorModule, AdvisorSimModule],
    controllers: [MatrixCoreController],
    providers: [MatrixCoreService]
})

export class MatrixCoreModule {}
