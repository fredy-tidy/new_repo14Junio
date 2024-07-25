'use strict' 
//const utilities = require("../../utilities")
    // console.log(" entry in display tools")
     
    
    //if (res.locals.loggedin) {
    ////////////////
   
    // //console.log(`classification_id is: ${classification_id}`) 
    let query_id = 0 
    let classIdURL = "/account/userLogged/"
     fetch(classIdURL) 
         .then(function (response) { 
         if (response.ok) { 
             return response.json(); 
         } 
         throw Error("Network response was not OK"); 
         }) 
         .then(function (data) { 
         //console.log("print_in_fetch"+data); 
         display_tools(data); 
          
         }) 
         .catch(function (error) { 
        console.log('There was a problem: ', error.message) 
         }) 
    

         
    // ////////////////
       function display_tools(data){
           let toolsDisplay = document.querySelector("#tools")
            let links = '<a title="Click to long in" href="/account/login">My Account</a>'
           if(data.login== 1){
            links ='<a title="Welcome Basic" href="/account/">Welcome Basic</a> <br> '
            links += '<a title="Click to logout" href="/account/logout">logout</a>'
            
           }
           toolsDisplay.innerHTML = links
    
          }
    
    
      
 