// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

// Add a "GET" route for the path that will be sent when the "My Account"
// link is clicked
// the route should reflect only the part of the path that follows "account".
// The account part of the path should be placed in the server.js file,
// when this router is required.

// Route to build login view
router.get("/login",utilities.handleErrors(accountController.buildLogin))
router.get("/register",utilities.handleErrors( accountController.buildRegister ))
router.post('/register', utilities.handleErrors(accountController.registerAccount))

module.exports = router

