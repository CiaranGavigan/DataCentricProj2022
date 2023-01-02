// require promise-mysql
const res = require('express/lib/response');
var mysql = require('promise-mysql')

// create a pool variable
var pool

// create pool
mysql.createPool({
    // set pool parameters
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj2022'
})
    // create a promise
    .then((result) => {
        // set pool = result
        pool = result
    })
    .catch((err) => {
        // catch and log any error
        console.log(err)
    });

// create a getEmployees function to get all employees
var getEmployees = function () {
    // returns a promise
    return new Promise((resolve, reject) => {
        // send the query to mysql
        pool.query('select * from employee')
            // creates a promise 
            .then((result) => {
                // resolves result
                resolve(result)
            })
            .catch((error) => {
                // catches and rejects error 
                reject(error)
            })
    })
}

// create an editModule function to edit the module details and pass the name, credits and mid parameters
var editEmployee = function (name, role, salary, eid) {
    // returns a promise
    return new Promise((resolve, reject) => {
        // set up query for mysql
        var myQuery = {
            sql: 'update employee set name = ?, role = ?, salary = ? where eid = ?',
            values: [name, role, salary, eid]
        }
        // send the query to mysql
        pool.query(myQuery)
            .then((result) => {
                // resolves result
                resolve(result)
            })
            .catch(() => {
                // catches and rejects error 
                reject(error)
            })
    })
}

var getOneEmployee = function (eid) {

    return new Promise((resolve, reject) =>{
        //set up query for mysql
        var myQuery = {
            sql: 'select * from employee where eid = ?',
            values: [eid]
        }
        //send the query to mysql
        pool.query(myQuery)
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            //catches errors and rejects them
            reject(error)
        })
    })
}


// create a getDepartment function to get all Departments
var getDepartment = function () {
    // returns a promise
    return new Promise((resolve, reject) => {
        // send the query to mysql
        pool.query('select * from dept')
            // creates a promise 
            .then((result) => {
                // resolves result
                resolve(result)
            })
            .catch((error) => {
                // catches and rejects error 
                reject(error)
            })
    })
}


// export all methods here
module.exports = {getEmployees, getDepartment, editEmployee, getOneEmployee}