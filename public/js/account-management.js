'use strict' 
//const utilities = require("../../utilities")
     console.log(" entry in display tools")
     
    
    //if (res.locals.loggedin) {
    ////////////////
   
    // //console.log(`classification_id is: ${classification_id}`) 
    let classIdURL_ = "/account/getWelcome/"
     fetch(classIdURL_) 
         .then(function (response) { 
         if (response.ok) { 
             return response.json(); 
         } 
         throw Error("Network response was not OK"); 
         }) 
         .then(function (data) { 
         //console.log("print_in_fetch"+data); 
         display_welcome(data); 
          
         }) 
         .catch(function (error) { 
        console.log('There was a problem: ', error.message) 
         }) 
    // ////////////////
       function display_welcome(data){
           let welcomeDisplay = document.querySelector("#welcome")
            let welcome = data.tags
            console.log( "value :"+ welcome)
             welcomeDisplay.innerHTML = welcome
    
          }