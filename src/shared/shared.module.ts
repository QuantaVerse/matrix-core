import { Global, HttpModule, Module } from "@nestjs/common";
import { LoggerService } from "./services/logger.service";

const providers = [
    LoggerService
];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}