import { IHelmetOptions } from "./helmet.options.interface";

export function fetchHelmetOptions(): IHelmetOptions {
    return {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [`'self'`],
                styleSrc: [`'self'`, `'unsafe-inline'`],
                imgSrc: [`'self'`, "data:", "validator.swagger.io"],
                scriptSrc: [`'self'`, `https: 'unsafe-inline'`]
            }
        }
    };
}
