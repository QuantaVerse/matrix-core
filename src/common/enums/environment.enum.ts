export enum EnvironmentEnum {
    Development = "development",
    Staging = "staging",
    Production = "production"
}

export function getEnvironmentEnum(environment: string) {
    switch (environment) {
        case "production":
            return EnvironmentEnum.Production;
        case "staging":
            return EnvironmentEnum.Staging;
        default:
            return EnvironmentEnum.Development;
    }
}
