import pool from "../../db/db.js"

//show balance

export const showBal = async (req,res)=>{
    try{
        console.log('show bal')
        const id = Number(req.query.deptId)
        const result = await pool.query(`SELECT * FROM wallets WHERE department_id = $1 ;`,[id])

        res.json({
            success:true,
            bal:result.rows
        })
    }catch(err){
        console.log(err)
    }
}
