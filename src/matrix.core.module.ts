import { Module } from "@nestjs/common";
import { MatrixCoreController } from "./matrix.core.controller";
import { MatrixCoreService } from "./matrix.core.service";
import { LoggerModule } from "./logger/logger.module";

@Module({
    imports: [LoggerModule],
    controllers: [MatrixCoreController],
    providers: [MatrixCoreService]
})
export class MatrixCoreModule {}
