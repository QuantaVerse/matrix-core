import { Injectable, Logger, Scope } from "@nestjs/common";
import * as Bunyan from "bunyan";

import { ConfigService } from "./config.service";

@Injectable({ scope: Scope.DEFAULT })
export class LogWriterService extends Logger {
    private readonly _logWriter: Bunyan;

    constructor(private readonly _configService: ConfigService) {
        super();
        this._logWriter = Bunyan.createLogger(_configService.logWriterConfig);
    }

    public debug(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.info({ context }, ...message);
    }

    public verbose(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.info({ context }, ...message);
    }

    public log(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.info({ context }, ...message);
    }

    public warn(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.warn({ context }, ...message);
    }

    public error(message: any | any[], trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.error({ context, trace }, ...message);
    }

    public track(message: any | any[], error: Error, trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logWriter.error({ context, trace, err: error }, ...message);
    }
}
