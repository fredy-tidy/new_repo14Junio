const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

const inventoryModel = require("../models/inventory-model")

validate.nameClassificationRules = () => {
    
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty().withMessage("Need type characters")
        .isLength({ min: 1 })
        .withMessage("Please provide a name classification.")
        .isAlpha().withMessage("Only alphabetic charaters")
        .custom(async (classification_name) => {
            console.log (" the value of classification name: " + classification_name)
            const nameClassificationExists = await inventoryModel.checkExistingClassification(classification_name)
            if (nameClassificationExists){
                throw new Error("Name exists. Please only add different name that already exist")
            }
    }) // on error this message is sent.

    ]

}

/* ******************************
 * Check data and return errors or continue to add classification
 * ***************************** */
validate.checkaddClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
         console.log(" There here Errors")
        res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,
        
      })
      return
    }
    next()
  }


  module.exports = validate