"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySqlPoolCluster {
    constructor(cluster) {
        this.cluster = cluster;
    }
    addConfig(config) {
        this.cluster.add(config);
    }
    add(recipient, config) {
        this.cluster.add(recipient, config);
    }
    remove(recipient) {
        this.cluster.remove(recipient);
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            this.cluster.getConnection((err, connection) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve(connection);
                }
            });
        });
    }
    closeAll() {
        return new Promise((resolve, reject) => {
            this.cluster.end((err) => {
                if (err) {
                    reject(err.message);
                }
                else {
                    resolve();
                }
            });
        });
    }
    changeUser(data) {
        return new Promise((resolve, reject) => {
            this.getConnection().then(connection => {
                connection.changeUser(data, (err) => {
                    if (err) {
                        reject(err.message);
                    }
                    else {
                        resolve();
                    }
                });
            }).catch(err => reject(err.message));
        });
    }
}
exports.default = MySqlPoolCluster;
