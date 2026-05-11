import express from "express";
import { addDept } from "../controllers/dept/dept.js";
import { showBal } from "../controllers/wallet/wallet.js";
import { addTrans, showTrans } from "../controllers/transaction/transaction.js";

const route = express.Router()

route.get('/show-bal',showBal)
route.get('/show-trans',showTrans)

route.post('/add-dept',addDept)
route.post('/add-trans',addTrans)

export default route