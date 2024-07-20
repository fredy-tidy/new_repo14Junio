const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildManagementView = async function (req, res, next){
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
  title: "Vehicle Management",
  nav,
  errors:null,
  classificationSelected:null,
  })
}
/* ***********************
*  Return add clasification 
************************/

invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: " Add New Classification",
    nav,
    errors:null,

  })

}

/* ****************************************
*  Process addClassificationNAme
* *************************************** */
invCont.addClassificationName = async function (req, res) {
    
    const { classification_name} = req.body   
    const addClassificationResult = await invModel.addClassificationName(classification_name)
    let nav = await utilities.getNav()
   
    if (addClassificationResult) {
      req.flash(
        "notice",
        'Congratulations, you\'re add Classification '+classification_name+'.'
      )
      res.render("./inventory/management", {
        title: "Management",
        nav,
        errors:null,
        classificationSelected:null,
      })
      
    } else {
      req.flash("notice", "Sorry, add Classification name failed.")
      res.status(501).render("./inventory/add-classification", {
        title: "Add-Classification",
        nav,
        errors: null,
      })
    }
  }
  


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}



module.exports = invCont