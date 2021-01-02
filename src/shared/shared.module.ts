import { Global, HttpModule, Module } from "@nestjs/common";

import { ConfigService } from "./services/config.service";
import { LogWriterService } from "./services/log.writer.service";
import { CustomLoggerService } from "./services/logger.service";

const providers = [ConfigService, LogWriterService, CustomLoggerService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule]
})
export class SharedModule {}
