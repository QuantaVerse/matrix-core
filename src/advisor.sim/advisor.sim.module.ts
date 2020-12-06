import { Module } from "@nestjs/common";
import { AdvisorSimService } from "./advisor.sim.service";
import { AdvisorSimController } from "./advisor.sim.controller";
import { CqrsModule } from "@nestjs/cqrs";

@Module({
    imports: [CqrsModule],
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
