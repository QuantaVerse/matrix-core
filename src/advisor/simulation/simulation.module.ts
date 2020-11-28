import { Module } from "@nestjs/common";
import { SimulationService } from "./simulation.service";
import { SimulationController } from "./simulation.controller";
import { LoggerModule } from "../../logger/logger.module";

@Module({
    imports: [LoggerModule],
    controllers: [SimulationController],
    providers: [SimulationService]
})
export class SimulationModule {}
