
class Env {
    readonly cookieDomain: string;
    
    constructor(env: NodeJS.ProcessEnv) {
        this.cookieDomain = this.parseString(env.COOKIE_DOMAIN);
    }
    
    private parseBoolean = (input: string | undefined, fallback?: boolean): boolean => {
        if (!input) return fallback ?? false;
        return JSON.parse(input.toLowerCase()) === true;
    }

    private parseNumber = (input: string | undefined, fallback?: number): number => {
        if (!input) return fallback ?? 0;
        return parseFloat(input);
    }

    private parseString = (input: string | undefined, fallback?: string): string => {
        if (!input) return fallback ?? ``;
        return input;
    }
}

export default new Env(process.env);
