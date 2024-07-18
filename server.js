/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/

const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")
const session = require("express-session")
const pool = require('./database/')
const accountRoute = require("./routes/accountRoute")
//const accountController = require("./controllers/accountController")
const bodyParser = require("body-parser")
//Login: JWT and Cookie
const cookieParser = require("cookie-parser")



/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))

//Login: JWT and Cookie
app.use(cookieParser())
app.use(utilities.checkJWTToken)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root




/* ***********************
 * Routes
 *************************/
app.use(static)
// Index route add in the activies
// app.get("/", function(req, res){
//  res.render("index", {title: "Home"})
//})  
// I am changing this instruction 
app.get("/", baseController.buildHome)
app.use("/inv",inventoryRoute)
/*   Only for test */
// add the "account" route, using the Inventory route as an example.
app.use("/account",accountRoute)

app.use("/rigths",async ( req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}" 500-type error`)
  res.render("errors/error", {
    title: '500 Internal Server Error' || 'Internal Server Error',
    message: 'This Error is implemented intentionally.',
    nav
  })
} )

app.use("/account/",accountRoute)


// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})




/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST
const databaseUrl = process.env.DATABASE_URL

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})



/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})

