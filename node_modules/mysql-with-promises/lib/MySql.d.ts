import * as mysql from 'mysql';
export default class MySql {
    private host;
    private user;
    private password;
    private connection;
    constructor(host: string, user: string, password: string, connection: mysql.Connection);
    query(query: string, params?: any[]): Promise<unknown>;
    end(): Promise<unknown>;
    destroy(): void;
}
