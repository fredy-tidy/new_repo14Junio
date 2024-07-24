const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
// Team activity 
const accountModel = require("../models/account-model")

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.updateAccountRules = () => {
    return [
      // firstname is required and must be string
      body("account_firstname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.
  
      // lastname is required and must be string
      body("account_lastname")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.
  
      // valid email is required and cannot already exist in the DB
      
      body("account_email")
        .trim()
        .notEmpty()
        .isEmail()
        .normalizeEmail() // refer to validator.js docs
        .withMessage("A valid email is required."),
    
    ]
  }

/* **************************************
*  Rules for Update Password  field
* ********************************* */

validate.updatePasswordRules = () => {
    return [
      // password is required and must be strong password
      body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
          minLength: 12,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
        .withMessage("Password does not meet requirements."),
    ]
}

  /* *******************************************************
 * Check data and return errors or continue to update Account
 * ********************************************************* */
validate.checkUpdateAccountData = async (req, res, next) => {
    const { account_id } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
               
     let data = await accountModel.getAccountById(account_id)
      let  accountName = ""+data.account_firstname + " " + data.account_lastname
         console.log("Los valores de los datos "+ data.firstname)
         let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the update Account Data failed.")
      res.status(501).render("account/update-account", {
      title: "Update " + accountName,
      nav,
      errors: null,
      account_id, 
      account_firstname: data.account_firstname,  
      account_lastname: data.account_lastname, 
      account_email: data.account_email,
      account_password,
      })
      return
    }
    next()
  }


/* ******************************
 * Check data and return errors or continue Change of Password
 * ***************************** */
validate.checkChangePassData = async (req, res, next) => {
    const { account_id, account_password } = req.body
    let errors = []
    errors = validationResult(req)
    //console.log(" Cuenta: "+account_id+" pass "+account_password)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let data = await accountModel.getAccountById(account_id)
      let  accountName = data.account_firstname + " " + data.account_lastname
         console.log("Los valores de los datos "+ data.firstname)
      
      req.flash("notice", "Sorry, the update password failed.")
      res.status(501).render("account/update-account", {
      title: "Update " + accountName,
      nav,
      errors: null,
      account_id, 
      account_firstname: data.account_firstname,  
      account_lastname: data.account_lastname, 
      account_email: data.account_email,
      account_password,
      })
      return
    }
    next()
  }

  module.exports = validate