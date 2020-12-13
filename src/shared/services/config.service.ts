import * as dotenv from "dotenv";

import { EnvironmentEnum, getEnvironmentEnum } from "../../common/enums/environment.enum";
import { ISwaggerConfigInterface } from "../../common/interfaces/swagger-config.interface";

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
}
