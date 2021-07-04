import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Bunyan from "bunyan";
import * as bunyanFormat from "bunyan-format";
import * as dotenv from "dotenv";
import { existsSync } from "fs";

import { EnvironmentEnum, getEnvironmentEnum } from "../../common/enums/environment.enum";
import { ISwaggerConfigInterface } from "../../common/interfaces/swagger-config.interface";
import { SnakeNamingStrategy } from "../../config/db/snake-naming-strategy";

@Injectable()
export class ConfigService {
    private readonly ENV_FILE_NAME: string = ".env";

    constructor() {
        try {
            if (!existsSync(this.ENV_FILE_NAME)) {
                console.error(`ConfigService: env file "${this.ENV_FILE_NAME}" not found!`);
                process.exit(); // force exit as .env file not found
            }
        } catch (e) {
            console.error(`ConfigService: exception initializing env file: ${e.toString}`, e);
        }
        dotenv.config({
            path: this.ENV_FILE_NAME
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

    public get globalPrefixV1(): string {
        return this.get("GLOBAL_PREFIX_V1");
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
                path: "logs/matrix-core-logs",
                period: "1h",
                count: 6
            },
            {
                type: "rotating-file",
                level: Bunyan.WARN,
                path: "logs/matrix-core-warns",
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

    public get typeOrmConfig(): TypeOrmModuleOptions {
        let entities = [__dirname + "/../../modules/**/*.entity{.ts,.js}"];
        let migrations = [__dirname + "/../../migrations/*{.ts,.js}"];

        if ((module as any).hot) {
            const entityContext = (require as any).context("./../../modules", true, /\.entity\.ts$/);
            entities = entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
            const migrationContext = (require as any).context("./../../migrations", false, /\.ts$/);
            migrations = migrationContext.keys().map((id) => {
                const migrationModule = migrationContext(id);
                const [migration] = Object.values(migrationModule);
                return migration;
            });
        }

        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: "postgres",
            host: this.get("PG_HOST"),
            port: this.getNumber("PG_PORT"),
            username: this.get("PG_USERNAME"),
            password: this.get("PG_PASSWORD"),
            database: this.get("PG_DATABASE"),
            migrationsRun: true,
            logging: this.nodeEnv === "development",
            namingStrategy: new SnakeNamingStrategy()
        };
    }
}
