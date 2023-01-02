"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
const MySql_1 = __importDefault(require("./MySql"));
const MySqlURL_1 = __importDefault(require("./MySqlURL"));
const MySqlPool_1 = __importDefault(require("./MySqlPool"));
const MySqlPoolCluster_1 = __importDefault(require("./MySqlPoolCluster"));
exports.connect = (host, user, password, database) => new Promise((resolve, reject) => {
    if (database) {
        const con = mysql.createConnection({ host, user, password, database });
        con.connect((err) => {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(new MySql_1.default(host, user, password, con));
            }
        });
    }
    else {
        const con = mysql.createConnection({ host, user, password });
        con.connect((err) => {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(new MySql_1.default(host, user, password, con));
            }
        });
    }
});
exports.connectWithURL = (url) => new Promise((resolve, reject) => {
    const con = mysql.createConnection(url);
    con.connect((err) => {
        if (err) {
            reject(err.message);
        }
        else {
            resolve(new MySqlURL_1.default(con));
        }
    });
});
exports.pool = (limit, host, user, password, database) => new Promise((resolve, reject) => {
    if (database) {
        const pool = mysql.createPool({
            connectionLimit: limit,
            host,
            user,
            password,
            database
        });
        resolve(new MySqlPool_1.default(limit, host, user, password, pool));
    }
    else {
        const pool = mysql.createPool({
            connectionLimit: limit,
            host,
            user,
            password
        });
        resolve(new MySqlPool_1.default(limit, host, user, password, pool));
    }
});
exports.createCluster = () => new Promise((resolve, reject) => {
    resolve(new MySqlPoolCluster_1.default(mysql.createPoolCluster()));
});
