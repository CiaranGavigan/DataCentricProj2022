export declare const connect: (host: string, user: string, password: string, database?: string | undefined) => Promise<unknown>;
export declare const connectWithURL: (url: string) => Promise<unknown>;
export declare const pool: (limit: number, host: string, user: string, password: string, database?: string | undefined) => Promise<unknown>;
export declare const createCluster: () => Promise<unknown>;
