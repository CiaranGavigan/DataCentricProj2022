const express = require('express')
const res = require('express/lib/response')
const app = express()
// port 3000
const port = 3000
// require mySqlDao to control mysql 
var mySqlDao = require('./mySqlDao')
// require mongoDao to control mongo
var mongoDao = require('./mongoDao')
var bodyParser = require('body-parser')
const { body, validationResult, check } = require('express-validator');
const mysql2Promise = require('mysql2-promise')

// set view engine to ejs
app.set('view engine', 'ejs')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// get request to / to display home page
app.get('/', (req, res) => {
    // render the homePage file
    res.render('homePage')
})
// get request to /listEmployees to display all Employees
app.get('/listEmployees', (req, res) => {
    // call getEmployee method in mySqlDao 
    mySqlDao.getEmployees()
    // create a promise
        .then((result) => {
            // render list modules file pass result down
            res.render('listEmployees', {employee:result})
        })
        .catch((error) => {
            // catch and send error
            res.send(error)
        })
})

// get request to /listDepartments to display all Departments
app.get('/listDepartments', (req, res) => {
    // call getDepartment method in mySqlDao 
    mySqlDao.getDepartment()
    // create a promise
        .then((result) => {
            // render list modules file pass result down
            res.render('listDepartments', {department:result})
        })
        .catch((error) => {
            // catch and send error
            res.send(error)
        })
})
//get req to /employee/edit/:eid to get employee info to display it 
app.get('/employee/edit/:eid', (req, res) =>{
    //call getOneEmployee in mysqlDao
    mySqlDao.getOneEmployee(req.params.eid)
//create a promise
    .then((result) =>{
        //log result in console
        console.log(result)

        res.render('editEmployee', {errors:undefined, employee:result})
    })
    
    .catch.log((error) =>{
        //log any errors to console
        console.log(error)
    })
})

app.post('/employee/edit/:eid',
[

    check('name').isLength({min:5}).withMessage("Name must be a minimum of 5 characters")
    //check('salary').isInt({min:0}).withMessage("Salary must be greater than 0")
    //check('role').isString({Manager,Employee}).withMessage("Role must be either Manager or Employee")



],
(req, res) =>{
    var errors = validationResult(req)

    var empId = req.params.eid


    if(!errors.isEmpty()){
        
        mySqlDao.getOneEmployee(req.params.eid)

        .then((result) =>{

            console.log(result)

            res.render('editEmployee', {errors:errors.errors, employee:result})
        })
    }
    else{
        mySqlDao.editEmployee(req.body.name, req.body.role, req.body.salary, empId)

        .then((result) =>{

            console.log(result)

            res.redirect('/listEmployees')
        })
        .catch((error) =>{
            
            console.log(error)
        })
    }
})

// get request to /listLecturers to display all lecturers
app.get('/listEmployeesMDB', (req, res) => {
    // call getLecturers in mongoDao
    mongoDao.getEmployeesInfo()
        // create a promise
        .then((documents) => {
            // render listLecturers page and pass documents
            res.render('listEmployeesMDB', {employee:documents})
        })
        .catch((error) => {
            // catch and display any error
            res.send(error)
        })
})

 app.get('/addEmployeeMDB', (req, res) =>{
     //render addEmployeeMDB  page and pass no error params as blank
     res.render('addEmployeeMDB', {errors:undefined, dupe:"", _id:"", phone:"", email:""})
 })

app.post('/addEmployeeMDB'

[
    check('_id').isLength({min:4, max:4}).withMessage("Employee ID must be 4 characters")
   // check('phone').isLength({min:5}).withMessage("phone number must be at least 5 characters")
    
],
(req, res) => {
    //set errors = validationResult
    var errors = validationResult(req)

    if (!errors.isEmpty()) {
        // render addLecturer page and pass errors, dupe as blank and req.body for other parameters
        res.render('addEmployeeMDB', {errors:errors.errors, dupe:"", _id:req.body._id, phone:req.body.phone, email:req.body.email})
    }
    else {
        // if there are no errors continue to call addLecturer method in mongoDao and pass the _id, name and dept
        mongoDao.addEmployeeInfo(req.body._id, req.body.phone, req.body.email)
            // create a promise
            .then((result) => {
                // log the result
                console.log(result)
                // redirect to /listLecturers page
                res.redirect("/listEmployeesMDB")
            })
            .catch((error) => {
                // if error message has 11000 in it its a duplication error
                if(error.message.includes("11000"))
                {
                    // render addLecturer and pass errors and set dupe to Id already exists for the error code 11000, pass the req.body of _id, name and dept too
                    res.render('addEmployeeMDB', {errors:errors.errors, dupe:"ID already exists", _id:req.body._id, phone:req.body.phone, email:req.body.email})
                }
                else 
                {
                    // catch and display any other errors
                    res.send(error.message)
                }
            })
    }
})








app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})
