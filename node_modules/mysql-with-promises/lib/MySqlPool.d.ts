import * as mysql from 'mysql';
export default class MySqlPool {
    private limit;
    private host;
    private user;
    private password;
    private pool;
    constructor(limit: number, host: string, user: string, password: string, pool: mysql.Pool);
    query(query: string, params?: any[]): Promise<unknown>;
    release(): Promise<unknown>;
}
