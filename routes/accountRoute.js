// Needed Resources 
const utilities = require("../utilities")
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const updateAccountValidate = require("../utilities/update_account-validation")
const commentsValidate = require("../utilities/message_validaton")
// server side data validation 
const regValidate = require('../utilities/account-validation')
// Add a "GET" route for the path that will be sent when the "My Account"
// link is clicked
// the route should reflect only the part of the path that follows "account".
// The account part of the path should be placed in the server.js file,
// when this router is required.

// Route to build login view
router.get("/login",utilities.handleErrors(accountController.buildLogin))
router.get("/register",utilities.handleErrors( accountController.buildRegister ));
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
    utilities.handleErrors(accountController.accountLogin),
   // (req, res) => {
   // res.status(200).send('login process')
   //},
    
    )
router.get("/userLogged", utilities.handleErrors(utilities.userLoggedTestJSON))

router.get("/logout", utilities.handleErrors(utilities.userLogout))

router.get("/getWelcome", utilities.handleErrors(utilities.getWelcome))

router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.updateView))

router.post("/change-pass", 
  utilities.checkLogin,
  updateAccountValidate.updatePasswordRules(),
  updateAccountValidate.checkChangePassData,
  utilities.handleErrors(accountController.updatePassword)
 )

router.post("/update",
   utilities.checkLogin,
   updateAccountValidate.updateAccountRules(),
   updateAccountValidate.checkUpdateAccountData,
   utilities.handleErrors(accountController.updateAccount))

   router.get("/userType", utilities.handleErrors(utilities.userLoggedTestJSON))


router.get("/add_comments/:account_id",
    utilities.checkLogin,
    utilities.handleErrors(accountController.add_commentView))

router.post("/add_comments/",
  utilities.checkLogin,
  commentsValidate.commentsRules(),
  commentsValidate.checkCommentData,
  utilities.handleErrors(accountController.add_comment)
)

router.get("/view_comments/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.viewComments)
)

module.exports = router

