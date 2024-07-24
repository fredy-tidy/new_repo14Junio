// Require Statements
const accountModel = require("../models/account-model")
const utilities = require("../utilities/")

const accountController = {}
// Password hash
const bcrypt = require("bcryptjs")

// Login: JWT and Cookie
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
accountController.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors:null,
    })
}
/* ****************************************
*  Deliver Register view  (Deliver registration view)
* *************************************** */
accountController.buildRegister = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
    })
}


/* ****************************************
*  Process Registration
* *************************************** */
accountController.registerAccount = async function (req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body

    // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }



  
    const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
    )
    



  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
        errors: null,
      })
    }
  }
  

  /* ****************************************
 *  Process login request
 * ************************************ */
  accountController.accountLogin = async function (req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
   })
  return
  }
  try {
   if (await bcrypt.compare(account_password, accountData.account_password)) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
   if(process.env.NODE_ENV === 'development') {
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     } else {
       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
     }
   return res.redirect("/account/")
   }
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }
  
 /* ****************************************
*  Deliver login view
* *************************************** */
accountController.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("./account/account-management", {
    title: "Account management view",
    nav,
    errors:null,
  })
}

/* *************************************
*  Retun the view Account Update
* ************************************ */
accountController.updateView = async function (req, res, next) {
  const account_id = parseInt(req.params.account_id)
  let nav = await utilities.getNav();
  const accountData = await accountModel.getAccountById(account_id)
  //let welcome = await utilities.getWelcome();
  res.render("./account/update-account", {
    title: "Update account",
    nav,
    account_id : accountData.account_id,
    account_firstname : accountData.account_firstname,
    account_lastname : accountData.account_lastname,
    account_email : accountData.account_email,
    errors:null,
  })
}

accountController.updateAccount = async function (req, res, next) {
  const {
    account_id, 
    account_firstname,  
    account_lastname, 
    account_email, 
     } = req.body 

     const updateAccountResult = await accountModel.updateAccount( 
      account_id, 
      account_firstname,  
      account_lastname, 
      account_email)

let nav = await utilities.getNav()
const itemName = updateAccountResult.account_firstname + " " + updateAccountResult.account_lastname
  
if (updateAccountResult) {
  req.flash("notice", ` ${itemName} your account was successfully updated.`)
  res.redirect("/account/")
} else {
  req.flash("notice", "Sorry, the update failed.")
  res.status(501).render("account/update-account", {
  title: "Update " + itemName,
  nav,
  errors: null,
  account_id, 
  account_firstname,  
  account_lastname, 
  account_email
  })
}
}

/* *************************************
*  Update Password 
* ************************************ */
accountController.updatePassword = async function (req, res, next) {
  const {
    account_id, 
    account_password,   
     } = req.body 

//let nav = await utilities.getNav()
// const itemName = updatePasswordResult.account_firstname + " " + updateAccountResult.account_lastname
    let hashedPassword
    try {
      // regular password and cost (salt is generated automatically)
      hashedPassword = await bcrypt.hashSync(account_password, 10)
    } catch (error) {
      req.flash("notice", 'Sorry, there was an error processing the registration.')
      res.status(500).render("account/update/"+account_id)
    }
    
    const updatePasswordResult = await accountModel.updatePassword( 
      account_id, 
      hashedPassword)

if (updatePasswordResult) {
  req.flash("notice", "Your Password was successfully updated.")
  res.redirect("/account/")
} else {
  let data = accountModel.getAccountById(account_id)
  let  accountName = data.account_firstname + " " + data.account_lastname
  req.flash("notice", "Sorry, the update password failed.")
  res.status(501).render("account/update-account", {
  title: "Update " + accountName,
  nav,
  errors: null,
  account_id, 
  account_firstname: data.account_firstname,  
  account_lastname: data.account_lastname, 
  account_email: data.account_email,
  })
}
}

/*
  invCont.addNewVehicle = async function (req, res) {
    
    
  
   let nav = await utilities.getNav()
 
 if (addNewVehicleResult) {
  
  const classificationSelect = await utilities.buildClassificationList()
     req.flash(
       "notice",
       'Congratulations, you\'re add a new vehicle that is model: '+inv_model+'.'
    )
     res.render("./inventory/management", {
       title: "Management",
       nav,
       errors:null,
       classificationSelect
     })
    
   } else {
    let classificationList = await utilities.buildClassificationList()
     req.flash("notice", "Sorry, add new Vehicle name failed.")
     res.status(501).render("./inventory/add-inventory", {
       title: "Add New Vehicle",
       nav,
       errors: null,
       classificationList,
       classificationSelected:null,
    })
   }
}
*/

  module.exports = accountController