import { RateLimitPluginOptions } from "fastify-rate-limit";

export function fetchRateLimiterOptions(): RateLimitPluginOptions {
    return {
        max: 25,
        timeWindow: "1 minute"
    };
}
