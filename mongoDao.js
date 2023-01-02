// require mongodb to conenct to database
const { MongoClient } = require('mongodb');
//const { resolve } = require('path');

// Connection URL
const url = 'mongodb://localhost:27017';

// create consts for database and collection names
const dbName = "employeesDB"
const collName = "employees"

var employeesDB
var employees

var sort = {_id: 1}

//connect to mongo client url

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
//create a promise
.then((client) => {
    //set employeesDB variable to the dbName in  mongo db
    employeeDB = client.db(dbName)
    //set the employees variable to the collection name in  mongo db
    employees = employeesDB.collection(collName)
})
.catch((error) =>{
    //catch and log errors
    console.log(error)
})

//create a getEmployeesInfo function to get all the employeesInfo in db
var getEmployeesInfo = function(){
    return new Promise((resolve, reject) =>{
        //cursor finds all the employee info and sorts them in ascending order
        var cursor = employees.find().sort(sort)
        //send employee info to array
        cursor.toArray()
        //created a promise
        .then((documents) =>{
            //resolves documents
            resolve(documents)
        })
        .catch((error) =>{
            //catches errors and rejects them
            reject(error)
        })
    })
}


var addEmployeeInfo = function (_id, phone, email) {
    //return promise
    return new Promise((resolve, reject) =>{
        //insert employee _id, phone, email into mongo db here
        employees.insertOne({"_id": _id, "phone": phone, "email": email})
        //creates promise
        .then((result) =>{
            //resolves result
            resolve(result)
        })
        .catch((error) =>{
            //catch and reject error
            reject(error)
        })
    })
}

//export methods
module.exports = {getEmployeesInfo, addEmployeeInfo}