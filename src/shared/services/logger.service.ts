import { Injectable, Logger, Scope } from "@nestjs/common";
import * as Bunyan from "bunyan";
import * as bunyanFormat from "bunyan-format";
import * as colors from "colors";

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends Logger {
    private readonly _logger: Bunyan;
    private isEmpty = obj => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

    /**
     * Creates an instance of BunyanLoggerService.
     *   {({
     *     projectId: string;
     *     formatterOptions: {
     *       outputMode: string; // short|long|simple|json|bunyan
     *       color?: boolean;
     *       levelInString?: boolean;
     *       colorFromLevel?: any;
     *     };
     *     customStreams?: any[];
     *   })} options
     * @instance BunyanLoggerService
     * @param options
     */
    constructor(
        options: {
            projectId: string;
            formatterOptions: {
                [key: string]: any;
            };
            customStreams?: Bunyan.Stream[];
        } = {
            projectId: "matrix-core",
            formatterOptions: {
                outputMode: "long"
            }
        }
    ) {
        super();
        const { projectId, formatterOptions, customStreams } = options;
        if (projectId == null || this.isEmpty(projectId)) {
            throw new Error(`projectId is required`);
        }
        const defaultStream: Bunyan.Stream = { level: "info", type: "stream", stream: bunyanFormat(formatterOptions) };
        const streams: Bunyan.Stream[] = [defaultStream, ...(customStreams || [])];

        this._logger = Bunyan.createLogger({
            level: Bunyan.INFO,
            name: projectId,
            streams: [...streams],
            serializers: Bunyan.stdSerializers
        });
    }

    public debug(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message.map(msg => colors.blue(msg)));
    }

    public verbose(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message.map(msg => colors.black(msg)));
    }

    public log(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.info({ context }, ...message);
    }

    public warn(message: any | any[], context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.warn({ context }, ...message.map(msg => colors.yellow(msg)));
    }

    public error(message: any | any[], trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.error({ context, trace }, ...message.map(msg => colors.red(msg)));
    }

    public track(message: any | any[], error: Error, trace?: string | undefined, context: string | undefined = this.context) {
        message = Array.isArray(message) ? message : [message];
        this._logger.error({ context, trace, err: error }, ...message.map(msg => colors.red(msg)));
    }
}
