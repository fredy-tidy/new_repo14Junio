const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

const inventoryModel = require("../models/inventory-model")

validate.newVehicleRules = () => {
    // inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id       -->
         
    return [
      // Make is required and must be string
      body("inv_make")
        .trim()
        .notEmpty().withMessage("Need type characters")
        .isLength({ min: 3 })
        .withMessage("Please must almost 3 characters.")
        .isAlpha().withMessage("Only alphabetic charaters in make"), // on error this message is sent.

       // Model is required and must be string
       body("inv_model")
       .trim()
       .notEmpty().withMessage("Need type characters")
       .isLength({ min: 3 })
       .withMessage("Please must almost 3 characters.")
       .isString().withMessage("Only string in model"), // on error this message is sent.
//inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id       -->
       // Year is required and must be number
       body("inv_year")
       .trim()
       .notEmpty().withMessage("Need type characters")
       .isLength({ min: 4, max: 4 }).withMessage("Must to be 4 digits")
       .isInt().withMessage("Only digits"), // on error this message is sent.

       // The path of the image is required and must be string
       body("inv_image")
       .trim()
       .notEmpty().withMessage("Need type characters")
       .isString().withMessage("The path is required"), // on error this message is sent.
       
       // The path of the thumbail is required and must be string
       body("inv_thumbnail")
       .trim()
       .notEmpty().withMessage("Need type the path")
       .isString().withMessage("The path is required"), // on error this message is sent.

      
        // inv_price, inv_miles, inv_color, classification_id       -->
        // The price is required and must numeric
       body("inv_price")
       .trim()
       .notEmpty().withMessage("Need type the quantity")
       .isNumeric().withMessage("The value is required"), // on error this message is sent.

       body("inv_miles")
       .trim()
       .notEmpty().withMessage("Need type the quantity of miles")
       .isInt().withMessage("Must type a integer value"),
      
       body("inv_color")
       .trim()
       .notEmpty().withMessage("Need type characters")
       .isString().withMessage("The color must be a string"),

    ]

}

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
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

      console.log( " Recibe Data:" + inv_make + " - " + inv_model+ " - " +
        inv_year+ " - " +
        inv_description+ " - " + 
        inv_image+ " - " +
        inv_thumbnail+ " - " +
        inv_price+ " - " +
        inv_miles+ " - " +
        inv_color+ " - " +
        classification_id )

    let errors = []
    errors = validationResult(req)
       //console.log ( " Los Errores son: " + errors)

    if (!errors.isEmpty()) {
        
      let nav = await utilities.getNav()
      let classificationList = await utilities.buildClassificationList()
      console.log ( " recupero la lista " + errors)
        res.render("inventory/add-inventory", {
        errors,
        title: "Add New Vehicle",
        nav,
        classificationList,
        inv_make, 
            inv_model, 
            inv_year, 
            inv_description, 
            inv_image, 
            inv_thumbnail, 
            inv_price, 
            inv_miles, 
            inv_color, 
            classification_id,
             
        
      })
      return
    }
    next()
  }


  module.exports = validate