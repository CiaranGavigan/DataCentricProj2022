import * as mysql from 'mysql'
import UserInterface from './UserInterface'
import User from './UserInterface'

export default class MySqlPoolCluster {
    private cluster: mysql.PoolCluster

    constructor(cluster: mysql.PoolCluster) {
        this.cluster = cluster
    }

    public addConfig(config: mysql.PoolConfig) {
       this.cluster.add(config)
    }

    public add(recipient: string, config: mysql.PoolConfig) {
        this.cluster.add(recipient, config)
    }

    public remove(recipient: string) {
        this.cluster.remove(recipient)
    }

    public getConnection() {
        return new Promise<mysql.PoolConnection>((resolve, reject) => {
            this.cluster.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
                if(err) {
                    reject(err.message)
                } else {
                    resolve(connection)
                }
            })
        })
    }

    public closeAll() {
        return new Promise((resolve, reject) => {
            this.cluster.end((err: mysql.MysqlError) => {
                if(err) {
                    reject(err.message)
                } else {
                    resolve()
                }
            })
        })
    }

    public changeUser(data: User) {
        return new Promise((resolve, reject) => {
            this.getConnection().then(connection => {
                connection.changeUser(data, (err: mysql.MysqlError) => {
                    if(err) {
                        reject(err.message)
                    } else {
                        resolve()
                    }
                } )
            }).catch(err => reject(err.message))
        })
    }
}