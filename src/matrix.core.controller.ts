import { Controller, Get } from "@nestjs/common";
import { MatrixCoreService } from "./matrix.core.service";
import { CustomLogger } from "./logger/custom.logger";

@Controller()
export class MatrixCoreController {
    constructor(private readonly matrixCoreService: MatrixCoreService, private logger: CustomLogger) {
        this.logger.setContext(MatrixCoreController.name);
    }

    @Get()
    getHello(): string {
        this.logger.debug(`getHealth`);
        this.logger.verbose(`getHealth`);
        this.logger.log(`getHealth`);
        this.logger.warn(`getHealth`);
        return this.matrixCoreService.getHello();
    }
}
