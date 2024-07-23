const invModel = require("../models/inventory-model")

const Util = {}
// Check the JWT
const jwt = require("jsonwebtoken")

require("dotenv").config()



/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next){
  let data = await invModel.getClassifications()
  
  //console.log(data)
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}
/* **************************************
* Build the details view HTML
* ************************************ */
Util.buildDetailGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<div class = "details">'
    data.forEach(vehicle => { 
      grid += '<div class="imagen">'
      grid += '<p class="details_image">' + '<img src="'+ vehicle.inv_image+'" alt="'+vehicle.inv_model+'"></p>'
      grid += '</div>'
      grid += '<div class="details_characteristics">'
      grid += '<p class="details_make_model">' + vehicle.inv_make+ ' '+ vehicle.inv_model+ ' Details </p>'
      
      grid += '<p class="details_price"> <span class="detail"> Price: </span> $'+ new Intl.NumberFormat('en-US').format(vehicle.inv_price) 
      +'</p>'
      grid += '<p class="details_description"> <span class="detail"> Description: </span>'
      + vehicle.inv_description+'</p>'
      grid += '<p class="details_color"> <span class="detail"> Color: </span>' 
      +  vehicle.inv_color+'</p>'
      grid += '<p class="details_miles"> <span class="detail" >Miles: </span>'
      +Intl.NumberFormat('en-US').format(vehicle.inv_miles) +'</p>'
      grid += '</div>'
      grid += '</div>'
    })
    
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    res.redirect("/account/login")
  }
 }

 /* ****************************************
 *  Build Classification List
 * ************************************ */
//Util.buildClassificationList_prev = async function() {
//  let data = await invModel.getClassifications()

//  let select_ = ' <select name="classificationList" id="pet-select"> '
//  select_ +='<option value="">--Choose a Classification--</option>'
//  data.rows.forEach((row) => {
//    select_ += '<option value="'+row.classification_id +'">'+ row.classification_name +'</option>'
//  })
//  select_ +='</select>'
//  return select_
//}

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    //console.log("Names in clasification: "+row.classification_name)
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}


/* ****************************************
 *  Add logout in header
 * ************************************ */
Util.userlogged = (req, res, next) => {
  let data = 0
  if(res.locals.loggedin){
  console.log ( "user logged: "+ res.locals.loggedin )
    data = 1
  } else {
   console.log(" aún no estas logeado")
  }
}
  Util.userLoggedTestJSON = async (req, res, next) => {
     let logged = 0
    if(res.locals.loggedin){
         logged = 1
    }
   
       
        //   if (data[0].login) {
       return res.json({ login: logged })
    //   } else {
    //     next(new Error("No data returned"))
    //   }
    }
    
    Util.userLogout = async(req, res, next) => {
        res.clearCookie("jwt");
        res.redirect("/");
      
      }


     //Document.cookie = cname + '=""'+ ";" + -1 + ";path=/";
    
  /* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLoginEmployeeAdmin = async (req, res, next) => {
   
  if (res.locals.loggedin) {
    if ((res.locals.accountData.account_type == "Employee") || (res.locals.accountData.account_type == "Admin")) {
          //console.log(" I'm "+res.locals.accountData.account_type + " entry /inv" )
      next()
    } else {
      req.flash("notice","You are not have authorization, login as Employee or Admin")
      return res.redirect("/account/login")
    }
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }
/* ****************************************
 *  return welcome element
 * ************************************ */
  Util.getWelcome = async function (req, res, next){
    let welcome = ""
    if(res.locals.loggedin){
      welcome += "<h2>  Welcome "+ res.locals.accountData.account_firstname +"</h2>"
      welcome += "<h2> You are login! </h2>"  
       if (res.locals.accountData.account_type == 'Client'){
        welcome += '<p> <a href="/account/update/'+res.locals.accountData.account_id+'" > Update Account Information </a></p>'
         } else {
        welcome += '<p> <a href="/account/update/'+res.locals.accountData.account_id+'" > Update Account Information </a></p> '     
        welcome += '<h3> Inventory Management </h3>' 
        welcome += '<p><a href="/inv/" > Inventory Management </a></p>'
    }
   }
    return res.json({tags:welcome})
  } 



module.exports = Util