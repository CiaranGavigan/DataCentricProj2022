"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySqlPool {
    constructor(limit, host, user, password, pool) {
        this.host = host;
        this.password = password;
        this.user = user;
        this.pool = pool;
        this.limit = limit;
    }
    query(query, params) {
        return new Promise((resolve, reject) => {
            if (params !== null && params !== undefined && params.length > 0) {
                this.pool.query(query, params, (err, result, fields) => {
                    if (err) {
                        reject(err.message);
                    }
                    else {
                        resolve({ result, fields });
                    }
                });
            }
            else {
                this.pool.query(query, (err, result, fields) => {
                    if (err) {
                        reject(err.message);
                    }
                    else {
                        resolve({ result, fields });
                    }
                });
            }
        });
    }
    release() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    conn.release();
                    resolve();
                }
            });
        });
    }
}
exports.default = MySqlPool;
