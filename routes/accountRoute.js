// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
// server side data validation 
const regValidate = require('../utilities/account-validation')
// Add a "GET" route for the path that will be sent when the "My Account"
// link is clicked
// the route should reflect only the part of the path that follows "account".
// The account part of the path should be placed in the server.js file,
// when this router is required.

// Route to build login view
router.get("/login",utilities.handleErrors(accountController.buildLogin))
router.get("/register",utilities.handleErrors( accountController.buildRegister ))
//router.post('/register', utilities.handleErrors(accountController.registerAccount))
//router.get("/",utilities.handleErrors(accountController.buildAccount))
//Data validation

// Authentication vs. Authorization
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Process the login attempt
router.post(
    "/login",regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
    //(req, res) => {
    // res.status(200).send('login process')
   //},
    
    )

module.exports = router

