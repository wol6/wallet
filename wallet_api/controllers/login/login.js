import pool from "../../db/db.js"


export const userLogin = async (req,res)=>{
    try{
        const {email,password} = req.body.formData
        //ToDo: add password col to table and encode
        const user = await pool.query(`SELECT * FROM users WHERE email=$1`,[email])
        res.json({
            success:true,
            user:user.rows
        })
    }catch(e){
        console.log(e)
    }
}