const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
// Team activity 
//const accountModel = require("../models/account-model")

  /*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
  validate.commentsRules = () => {
    return [
      // firstname is required and must be string
      body("comments_text")
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage("Please provide  almost one word min 3 characters."), 
    ]
  }

  /* *******************************************************
 * Check comments meet the rules 
 * ********************************************************* */
validate.checkCommentData = async (req, res, next) => {
    const { account_id, comments_text } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      req.flash("notice", "Sorry, the comment don't save.")
      res.status(501).render("account/add_comments", {
      title: "Add Comment  ",
      nav,
      errors: null,
      account_id, 
      comments_text,
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