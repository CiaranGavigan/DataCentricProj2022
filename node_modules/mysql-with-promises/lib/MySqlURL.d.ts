import * as mysql from 'mysql';
export default class MySqlURL {
    private connection;
    constructor(connection: mysql.Connection);
    query(query: string, params?: any[]): Promise<unknown>;
    end(): Promise<unknown>;
    destroy(): void;
}
