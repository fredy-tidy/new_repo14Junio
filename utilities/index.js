const invModel = require("../models/inventory-model")
const Util = {}


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  console.log(data)
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

module.exports = Util