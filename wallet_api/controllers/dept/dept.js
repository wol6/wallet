import pool from "../../db/db.js"


export const addDept = async (req,res)=>{
    try{
        console.log('dept')
        // const deptName = 'Finance'
        await pool.query(`INSERT INTO departments (name)
            VALUES ($1) `,[deptName])
        res.json({
            success:true,
            msg:"Dept added successfully"
        })
    }catch(err){
        console.log(err)
    }
}
