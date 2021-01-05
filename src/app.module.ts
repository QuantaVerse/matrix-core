import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AdvisorSimModule } from "./modules/advisor.sim/advisor.sim.module";
import { AdvisorModule } from "./modules/advisor/advisor.module";
import { ConfigService } from "./shared/services/config.service";
import { SharedModule } from "./shared/shared.module";

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useFactory: (configService: ConfigService) => configService.typeOrmConfig,
            inject: [ConfigService]
        }),
        TerminusModule,
        AdvisorModule,
        AdvisorSimModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
