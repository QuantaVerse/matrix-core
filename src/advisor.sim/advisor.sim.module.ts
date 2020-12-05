import { Module } from "@nestjs/common";
import { AdvisorSimService } from "./advisor.sim.service";
import { AdvisorSimController } from "./advisor.sim.controller";
import { LoggerModule } from "../logger/logger.module";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [LoggerModule, CqrsModule],
    controllers: [AdvisorSimController],
    providers: [
        AdvisorSimService,
        // ...CommandHandlers,
        // ...EventHandlers,
        // ...QueryHandlers,
        // HeroesGameSagas
    ]
})
export class AdvisorSimModule {}
