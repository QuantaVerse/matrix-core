import { Controller, Get } from "@nestjs/common";
import { MatrixCoreService } from "./matrix.core.service";
import { CustomLogger } from "./logger/custom.logger";

@Controller()
export class MatrixCoreController {
    constructor(private readonly matrixCoreService: MatrixCoreService, private logger: CustomLogger) {
        this.logger.setContext(MatrixCoreController.name);
    }

    @Get("/health")
    getHello(): string {
        this.logger.log(`getHealth`);
        return this.matrixCoreService.getHello();
    }
}
