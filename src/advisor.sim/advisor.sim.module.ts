import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { AdvisorSimController } from "./advisor.sim.controller";
import { AdvisorSimService } from "./advisor.sim.service";

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
