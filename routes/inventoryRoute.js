// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
// add week 03
const detailController = require("../controllers/detailController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// add week 03
router.get("/detail/:inv_id", detailController.buildByInvId);



module.exports = router;