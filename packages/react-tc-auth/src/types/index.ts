export interface Config {
    authApiRoot?: string;
    tokenAccessor: string;
    refreshTokenAccessor: string;
    tokenValueAccessor: string;
    tokenExpireAccessor: string;
    customGetFingerprint?: () => Promise<any>;
}
