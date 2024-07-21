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
  console.log(" Entry here")
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/management", {
  title: "Vehicle Management",
  nav,
  errors:null,
  classificationSelect,
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
*  Process addClassificationName
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

/* **************************
*  Return add-inventory page to give the form for agregate to the database
* *************************** */ 

invCont.buildAddVehicle = async function (req, res, next){
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: " Add New Vehicle",
    nav,
    errors:null,
    classificationList,
  })

}



/* **************************
*  Process to add a new vehicle to the database
* *************************** */ 

 invCont.addNewVehicle = async function (req, res) {
    
  const { inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id } = req.body 
    console.log(" Entry in invCont addNewVehicle")
    
  const addNewVehicleResult = await invModel.addNewVehicle(inv_make, 
    inv_model, 
    inv_year, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_miles, 
    inv_color, 
    classification_id)
   let nav = await utilities.getNav()
 
 if (addNewVehicleResult) {
     
     req.flash(
       "notice",
       'Congratulations, you\'re add a new vehicle that is model: '+inv_model+'.'
    )
     res.render("./inventory/management", {
       title: "Management",
       nav,
       errors:null,
       classificationSelected:null,
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

invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationList: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}



module.exports = invCont