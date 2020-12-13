import { Global, HttpModule, Module } from "@nestjs/common";

import { ConfigService } from "./services/config.service";
import { CustomLoggerService } from "./services/logger.service";

const providers = [ConfigService, CustomLoggerService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule]
})
export class SharedModule {}
