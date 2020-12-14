import { Injectable } from "@nestjs/common";
import * as Bunyan from "bunyan";
import * as bunyanFormat from "bunyan-format";
import * as dotenv from "dotenv";

import { EnvironmentEnum, getEnvironmentEnum } from "../../common/enums/environment.enum";
import { ISwaggerConfigInterface } from "../../common/interfaces/swagger-config.interface";

@Injectable()
export class ConfigService {
    constructor() {
        dotenv.config({
            path: ".env"
        });
        console.log(`ConfigService : Environment : ${process.env && process.env["NODE_ENV"]}`);
    }

    get(key: string): string {
        return process.env[key];
    }

    getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): EnvironmentEnum {
        return getEnvironmentEnum(this.get("NODE_ENV") || "development");
    }

    public get swaggerConfig(): ISwaggerConfigInterface {
        return {
            path: this.get("SWAGGER_PATH") || "swagger",
            title: this.get("SWAGGER_TITLE") || "Matrix Core API",
            description: this.get("SWAGGER_DESCRIPTION") || "All OpenAPI specs for Matrix Core",
            version: this.get("SWAGGER_VERSION") || "0.0.1",
            scheme: this.get("SWAGGER_SCHEME") === "https" ? "https" : "http",
            tag: this.get("SWAGGER_TAG") || "matrix"
        };
    }

    public get loggerConfig(): Bunyan.LoggerOptions {
        const projectId = this.get("LOGGER_PROJECT_ID");
        const defaultLevel = this.get("LOGGER_ENABLE_TRACE_LOG") ? Bunyan.TRACE : Bunyan.INFO;
        const formatterOptions: { [key: string]: any } = {
            outputMode: "long"
        };
        const customStreams: Bunyan.Stream[] = [];
        const defaultStream: Bunyan.Stream = { level: defaultLevel, type: "stream", stream: bunyanFormat(formatterOptions) };
        const streams: Bunyan.Stream[] = [defaultStream, ...(customStreams || [])];
        return {
            level: defaultLevel,
            name: projectId,
            streams: [...streams],
            serializers: Bunyan.stdSerializers
        };
    }

    public get logWriterConfig(): Bunyan.LoggerOptions {
        const projectId = this.get("LOGGER_PROJECT_ID");
        const defaultLevel = this.get("LOGGER_ENABLE_TRACE_LOG") ? Bunyan.TRACE : Bunyan.INFO;
        const writeStreams: Bunyan.Stream[] = [
            {
                type: "rotating-file",
                level: defaultLevel,
                path: "logs/matrix-core-log.log",
                period: "1h",
                count: 6
            },
            {
                type: "rotating-file",
                level: Bunyan.WARN,
                path: "logs/matrix-core-warn.log",
                period: "24h",
                count: 14
            }
        ];
        const streams: Bunyan.Stream[] = [...(writeStreams || [])];
        return {
            level: defaultLevel,
            name: projectId,
            streams: [...streams],
            serializers: Bunyan.stdSerializers
        };
    }
}
