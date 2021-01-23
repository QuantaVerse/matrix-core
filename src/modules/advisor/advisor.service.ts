import { Injectable } from "@nestjs/common";

import { CustomLoggerService } from "../../shared/services/logger.service";

@Injectable()
export class AdvisorService {
    constructor(private _logger: CustomLoggerService) {
        this._logger.setContext(AdvisorService.name);
    }

    getHello(): string {
        return "Hello World!";
    }
}
