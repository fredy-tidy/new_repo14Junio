const pool = require("../database")


/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }

  /* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

async function checkExistingEmailOthersAccounts(account_email, account_id){
  try {
    const sql = "SELECT * FROM account WHERE (account_email = $1 AND account_id != $2)"
    const email = await pool.query(sql, [account_email, account_id])
    return email.rowCount
  } catch (error) {
    return error.message
  }

}
/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* ***************
* Return a row from inventory getInventoryById
* **************** */
async function getAccountById(account_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.account 
      WHERE account_id = $1`,
      [account_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getAccountById error: " + error)
  }
}

/* *****************
*  Update Account Data
* **************** */
async function updateAccount (
  account_id, 
  account_firstname,  
  account_lastname, 
  account_email
  ) {
  try {
    const sql =
      "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
    const data = await pool.query(sql, [
      account_firstname,  
      account_lastname, 
      account_email,
      account_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}
/* **************
*  Update password in account
* ********** */ 
async function updatePassword( 
  account_id, 
  hashedPassword
  ) {
  try {
    const sql =
      "UPDATE public.account SET account_password= $1 WHERE account_id = $2 RETURNING *"
    const data = await pool.query(sql, [
      hashedPassword,
      account_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }

}
/* ***********
*
* ************ */
async function registerComments( account_id, comments_text){
  try {
    let id = parseInt(account_id)
    const sql = "INSERT INTO comments (account_id, comments_text) VALUES ($1, $2) RETURNING *"
    return await pool.query(sql, [id, comments_text])
  } catch (error) {
    return error.message
  }
}

/*  ***************
*  get Commets 
* ************ */
async function getComments(){
  return await pool.query("SELECT * FROM public.comments AS c JOIN public.account AS a ON c.account_id = a.account_id ORDER BY account_firstname")
}

async function getNameByID(account_id){
  try {
    const data = await pool.query(
      `SELECT account_firstname FROM public.account 
      WHERE account_id = $1`,
      [account_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getAccountById error: " + error)
  }
}

/* ***********
*  get Email from account by ID
* *********** */
async function getEmailByID(account_id){
  try {
    const data = await pool.query(
      `SELECT account_email FROM public.account 
      WHERE account_id = $1`,
      [account_id]
    )
    return data.rows[0]
  } catch (error) {
    console.error("getAccountById error: " + error)
  }
}





  module.exports = {registerAccount, checkExistingEmail, getAccountByEmail, getAccountById, updateAccount, updatePassword, checkExistingEmailOthersAccounts, registerComments, getComments, getNameByID, getEmailByID}