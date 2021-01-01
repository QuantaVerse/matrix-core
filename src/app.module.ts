import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AdvisorSimModule } from "./advisor.sim/advisor.sim.module";
import { AdvisorModule } from "./advisor/advisor.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
        AdvisorModule,
        AdvisorSimModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
