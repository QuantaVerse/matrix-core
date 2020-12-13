import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export function fetchCORSOptions(): boolean | CorsOptions {
    return true;
}
