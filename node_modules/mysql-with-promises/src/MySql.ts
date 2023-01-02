import * as mysql from 'mysql'
export default class MySql {
    private host: string
    private user: string
    private password: string
    private connection: mysql.Connection
    constructor( host: string, user: string, password: string, connection: mysql.Connection){
        this.host = host
        this.password = password
        this.user = user
        this.connection = connection
    }


    public query(query: string, params?: any[]) {
        return new Promise((resolve, reject) => {
            if(params !== null && params !== undefined && params.length > 0) {
                this.connection.query(query, params, (err: mysql.MysqlError | null, result: any, fields: any) => {
                    if(err) {
                        reject(err.message)
                    } else {
                        resolve({result, fields})
                    }
                })
            } else {
                this.connection.query(query, (err: mysql.MysqlError | null, result: any, fields: any) => {
                    if(err) {
                        reject(err.message)
                    } else {
                        resolve({result, fields})
                    }
                })
            }
        })
    }

    public end() {
        return new Promise((resolve, reject) => {
            this.connection.end((err: mysql.MysqlError | undefined) => {
                if(err) {
                    reject(err.message)
                } else {
                    resolve()
                }
            })
        })
    }

    public destroy() {
        this.connection.destroy()
    }

}