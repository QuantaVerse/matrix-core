import { ContentSecurityPolicyOptions } from "helmet/dist/middlewares/content-security-policy";
import { ExpectCtOptions } from "helmet/dist/middlewares/expect-ct";
import { ReferrerPolicyOptions } from "helmet/dist/middlewares/referrer-policy";
import { StrictTransportSecurityOptions } from "helmet/dist/middlewares/strict-transport-security";
import { XDnsPrefetchControlOptions } from "helmet/dist/middlewares/x-dns-prefetch-control";
import { XFrameOptionsOptions } from "helmet/dist/middlewares/x-frame-options";
import { XPermittedCrossDomainPoliciesOptions } from "helmet/dist/middlewares/x-permitted-cross-domain-policies";

declare type MiddlewareOption<T> = false | T;

export interface IHelmetOptions {
    contentSecurityPolicy?: MiddlewareOption<ContentSecurityPolicyOptions>;
    dnsPrefetchControl?: MiddlewareOption<XDnsPrefetchControlOptions>;
    expectCt?: MiddlewareOption<ExpectCtOptions>;
    frameguard?: MiddlewareOption<XFrameOptionsOptions>;
    hidePoweredBy?: MiddlewareOption<never>;
    hsts?: MiddlewareOption<StrictTransportSecurityOptions>;
    ieNoOpen?: MiddlewareOption<never>;
    noSniff?: MiddlewareOption<never>;
    permittedCrossDomainPolicies?: MiddlewareOption<XPermittedCrossDomainPoliciesOptions>;
    referrerPolicy?: MiddlewareOption<ReferrerPolicyOptions>;
    xssFilter?: MiddlewareOption<never>;
}
