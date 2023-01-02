"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySqlURL {
    constructor(connection) {
        this.connection = connection;
    }
    query(query, params) {
        return new Promise((resolve, reject) => {
            if (params !== null && params !== undefined && params.length > 0) {
                this.connection.query(query, params, (err, result, fields) => {
                    if (err) {
                        reject(err.message);
                    }
                    else {
                        resolve({ result, fields });
                    }
                });
            }
            else {
                this.connection.query(query, (err, result, fields) => {
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
    end() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve();
                }
            });
        });
    }
    destroy() {
        this.connection.destroy();
    }
}
exports.default = MySqlURL;
