import * as morgan from "morgan";

import { CustomLoggerService } from "../../shared/services/logger.service";

export const MORGAN_CUSTOM_FORMAT =
    'morgan :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] bytes ":referrer" ":user-agent"';

export function fetchMorganOptions(loggerService: CustomLoggerService): morgan.Options {
    return {
        stream: {
            write: (message) => {
                loggerService.log(message);
            }
        }
    };
}
