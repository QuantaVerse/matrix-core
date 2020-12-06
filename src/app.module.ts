import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdvisorSimModule } from "./advisor.sim/advisor.sim.module";
import { AdvisorModule } from "./advisor/advisor.module";
import { SharedModule } from "./shared/shared.module";

@Module({
    imports: [SharedModule, AdvisorModule, AdvisorSimModule],
    controllers: [AppController],
    providers: [AppService]
})

export class AppModule {}
