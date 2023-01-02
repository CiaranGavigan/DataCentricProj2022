import * as mysql from 'mysql'

export default class MySqlPool {
    private limit: number
    private host: string
    private user: string
    private password: string
    private pool: mysql.Pool
    constructor(limit: number, host: string, user: string, password: string, pool: mysql.Pool){
        this.host = host
        this.password = password
        this.user = user
        this.pool = pool
        this.limit = limit
    }

    public query(query: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            if(params !== null && params !== undefined && params.length > 0) {
                this.pool.query(query, params, (err: mysql.MysqlError | null, result: any, fields: any) => {
                    if(err) {
                        reject(err.message)
                    } else {
                        resolve({result, fields})
                    }
                })
            } else {
                this.pool.query(query, (err: mysql.MysqlError | null, result: any, fields: any) => {
                    if(err) {
                        reject(err.message)
                    } else {
                        resolve({result, fields})
                    }
                })
                
            }
        })
    }

    public release() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if(err) {
                    reject(err.message)
                } else {
                    conn.release()
                    resolve()
                }
            })
        })
    }
}