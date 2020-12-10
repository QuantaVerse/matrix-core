import { Global, HttpModule, Module } from "@nestjs/common";

import { CustomLoggerService } from "./services/logger.service";

const providers = [CustomLoggerService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule]
})
export class SharedModule {}
