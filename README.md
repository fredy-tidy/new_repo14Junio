## Getting Started

This document is intended to get you started quickly in building a backend driven Node.js application complete with pages and content, backend logic and a PostgreSQL database for data storage.
## Prerequisites

The only prerequisite software required to have installed at this point is Git for version control and a code editor - we will use VS Code (VSC).

## Package Management

The foundation of the project development software is Node. While functional, Node depends on "packages" to add functionality to accomplish common tasks. This requires a package manager. Three common managers are NPM (Node Package Manager), YARN, and PNPM. While all do the same thing, they do it slightly differently. We will use PNPM for two reasons: 1) All packages are stored on your computer only once and then symlinks (system links) are created from the package to the project as needed, 2) performance is increased meaning that when the project builds, it does so faster.
You will need to either install or activate PNPM before using it. See https://pnpm.io/

## Install the Project Dependencies

1. Open the downloaded project folder (where this file is located) in VS Code (VSC).
2. Open the VSC terminal: Terminal > New Window.
3. Run the following command in the terminal:

    pnpm install

4. The first time it may take a few minutes, depending on the speed of your computer and the speed of your Internet connection. This command will instruct PNPM to read the package.json file and download and install the dependencies (packages) needed for the project. It will build a "node_modules" folder storing each dependency and its dependencies. It should also create a pnpm-lock.yaml file. This file should NEVER be altered by you. It is an internal file (think of it as an inventory) that PNPM uses to keep track of everything in the project.

## Start the Express Server

With the packages installed you're ready to run the initial test.
1. If the VSC terminal is still open use it. If it is closed, open it again using the same command as before.
2. Type the following command, then press Enter:

    pnpm run dev

3. If the command works, you should see the message "app listening on localhost:5500" in the console.
4. Open the package.json file.
5. Note the "Scripts" area? There is a line with the name of "dev", which tells the nodemon package to run the server.js file.
6. This is the command you just ran.
7. Open the server.js file.
8. Near the bottom you'll see two variables "Port" and "Host". The values for the variables are stored in the .env file.
9. These variables are used when the server starts on your local machine.

## Move the demo file

When you installed Git and cloned the remote repository in week 1, you should have created a simple web page.
1. Find and move that simple web page to the public folder. Be sure to note its name.
## Test in a browser

1. Go to http://localhost:5500 in a browser tab. Nothing should be visible as the server has not been setup to repond to that route.
2. Add "/filename.html" to the end of the URL (replacing filename with the name of the file you moved to the public folder).
3. You should see that page in the browser.



## Aditional notes
Register three new accounts with the following information using your registration form:
account_firstname: Basic
account_lastname: Client
account_email: basic@340.edu
account_password: I@mABas1cCl!3nt


account_firstname: Happy
account_lastname: Employee
account_email: happy@340.edu
account_password: I@mAnEmpl0y33

account_firstname: Manager
account_lastname: User
account_email: manager@340.edu
account_password: I@mAnAdm!n1strat0r
Save these accounts' information as you will be using it often in the future.


Task to improve the app



Database Interaction: Will you need to create any new tables or columns? How will you update or query the database?
   A table that in case of coments this can save in this
New Model Behaviors: What new model behaviors will you need to add?
   A new CRUDE for add coments by the clients

  Will they be in a new model or added to an existing one?
     Yes only add a one table more, that permit if the client have comments the admin can see this.
New Controller Behaviors: What new controller behaviors will you 
     Need a controller for the view to add comment for the client
       that he can save or send to the app.
     The controller that permit show for the Admin

need to add? Will they be in a new controller or added to an existing one?
      Need add almost two create and read, and another if have time

New Views: What new views you need to add? Will you need to update existing views?
     Two wies more
Data Validation: What steps will you need to take to validate data?
     I need that client type the comments.
     And validation for only Admin can read the comments

Error Handling: What is your approach to handling errors?
     Need handling Errors in save the comments by Client, and read by Admin. 


Task for doing 

1 Add the link in the client account to add comments

2 Add the admin account link to see the comments

3 Add the page to add a comment
 - Add submit comment only if validation to verify that the field is not empty
 - Add controller to show form view to add comments
 - Add the controller to add the comment to the database.
 - Add controller to display view with comments list.
 - Add the functionality to save comments to the model
 - Add the functionality to read comments to the model

4 Add the page to display the list of users who made a comment, it will be a table

5 Add the comments table that is joined with the customer id in the database.

Information New about database:
Name a unique name for your PostgreSQl instanceProyect cse340_dbv3
Database Pstgre dbname cse340_fcs
User 