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

router.get("/login", accountController.buildLogin)

module.exports = router

