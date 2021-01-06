import { Injectable, Logger, Scope } from "@nestjs/common";
import * as Bunyan from "bunyan";
import * as colors from "colors";

import { ConfigService } from "./config.service";
import { LogWriterService } from "./log.writer.service";

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends Logger {
    private readonly _logger: Bunyan;

    /**
     * Creates an instance of BunyanLoggerService.
     * @instance BunyanLoggerService
     * @param _configService
     * @param _logWriterService
     */
    constructor(private readonly _configService: ConfigService, private readonly _logWriterService: LogWriterService) {
        super();
        this._logger = Bunyan.createLogger(_configService.loggerConfig);
    }

    public debug(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message.map((msg) => colors.blue(msg)));
        this._logWriterService.debug({ context }, ...message);
    }

    public verbose(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message.map((msg) => colors.black(msg)));
        this._logWriterService.verbose({ context }, ...message);
    }

    public log(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message);
        this._logWriterService.log({ context }, ...message);
    }

    public warn(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.warn({ context }, ...message.map((msg) => colors.yellow(msg)));
        this._logWriterService.warn({ context }, ...message);
    }

    public error(message: any | any[], trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.error({ context, trace }, ...message.map((msg) => colors.red(msg)));
        this._logWriterService.error({ context }, ...message);
    }

    public track(message: any | any[], error: Error, trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.error({ context, trace, err: error }, ...message.map((msg) => colors.red(msg)));
        this._logWriterService.track({ context }, error, ...message);
    }
}
