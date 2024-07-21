// Needed Resources 
const utilities = require("../utilities")
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
// add week 03
const detailController = require("../controllers/detailController")
//validate add Classification
const nameClassificationValidate = require('../utilities/addClassification-validation')

const newVehicleValidate = require("../utilities/newVehicle-validation")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// add week 03
router.get("/detail/:inv_id", detailController.buildByInvId);

router.get("/", utilities.checkLogin, invController.buildManagementView)
// Week 04 activity 4
// Add Clasification
router.get("/add-classification", utilities.checkLogin, utilities.handleErrors(invController.buildAddClassification))

router.post("/add-classification", 
    utilities.checkLogin, 
    nameClassificationValidate.nameClassificationRules(), 
    nameClassificationValidate.checkaddClassificationData,
    utilities.handleErrors(invController.addClassificationName)
)

router.get("/add-inventory", utilities.checkLogin, utilities.handleErrors(invController.buildAddVehicle))

 router.post("/add-inventory", 
     utilities.checkLogin, 
     newVehicleValidate.newVehicleRules(), 
     newVehicleValidate.checkVehicleData,
     utilities.handleErrors(invController.addNewVehicle)
 )



//Select Inventory Items
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

module.exports = router;