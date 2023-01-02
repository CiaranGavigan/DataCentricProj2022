import * as mysql from 'mysql';
import User from './UserInterface';
export default class MySqlPoolCluster {
    private cluster;
    constructor(cluster: mysql.PoolCluster);
    addConfig(config: mysql.PoolConfig): void;
    add(recipient: string, config: mysql.PoolConfig): void;
    remove(recipient: string): void;
    getConnection(): Promise<mysql.PoolConnection>;
    closeAll(): Promise<unknown>;
    changeUser(data: User): Promise<unknown>;
}
