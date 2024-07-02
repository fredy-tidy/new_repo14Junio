const pool = require("../database")

/* ***********************
 * Get details by inv_id data
 * ***********************/

async function getDetailById(inv_id){
    
    try {
      const data = await pool.query(
        `SELECT * FROM public.inventory AS i
        WHERE i.inv_id = $1`,
        [inv_id]
      )
      console.log("\n resultado consulta:"+ data.rows)
      return data.rows
    } catch (error) {
      console.error("getDetailsByid error " + error)
    }
}

module.exports = {getDetailById};
/* module.exports = {getDetailById} */