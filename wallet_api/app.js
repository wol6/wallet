import express from 'express'
import cors from 'cors'
import pool from './db/db.js'
import route from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
console.log('hekl')
app.use('/',route)

app.get('/',(req,res)=>{
    res.send('hi')
})

app.get('/users',async(req,res)=>{
    const user = await pool.query('SELECT * FROM users')
    res.json({
        succes:true,
        user:user.rows
    })
})

app.get('/add',async(req,res)=>{
    await pool.query("INSERT INTO users(name,email) VALUES('Jishu','j@gmail.com')")
    res.json({succes:true})
})

app.listen(5000,()=>{
    console.log(`Server started successfully`)
})