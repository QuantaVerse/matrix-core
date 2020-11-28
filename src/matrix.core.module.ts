import { Module } from "@nestjs/common";
import { MatrixCoreController } from "./matrix.core.controller";
import { MatrixCoreService } from "./matrix.core.service";
import { LoggerModule } from "./logger/logger.module";
import { SimulationModule } from "./advisor/simulation/simulation.module";
import { AdvisorModule } from "./advisor/advisor.module";

@Module({
    imports: [LoggerModule, AdvisorModule, SimulationModule],
    controllers: [MatrixCoreController],
    providers: [MatrixCoreService]
})
export class MatrixCoreModule {}
