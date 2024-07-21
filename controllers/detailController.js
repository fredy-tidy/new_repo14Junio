const invDetails = require("../models/details-model")
const utilities = require("../utilities")

const invDetail = {}

/* ***************************
 *  Build Details  by details view
 * ************************** */
invDetail.buildByInvId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data = await invDetails.getDetailById(inv_id)
  const grid = await utilities.buildDetailGrid(data)
  let nav = await utilities.getNav()
  //console.log(data)
  //const inv_id = data[0].inv_id
  res.render("./inventory/detail", {
    title: data[0].inv_year +" "+data[0].inv_make + " "+data[0].inv_model,
    nav,
    grid,
  })
}


module.exports = invDetail