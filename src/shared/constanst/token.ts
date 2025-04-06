export interface Token {
    access: {
        token: string;
        expires: string;
    };
    refresh: {
        token: string;
        expires: string;
    };
}