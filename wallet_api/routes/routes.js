import express from "express";
import { addDept } from "../controllers/dept/dept.js";
import { showBal } from "../controllers/wallet/wallet.js";
import { addTrans, showTrans } from "../controllers/transaction/transaction.js";
import { userLogin } from "../controllers/login/login.js";
import { invoicesList } from "../controllers/invoices/invoices.js";

const route = express.Router()

route.get('/show-bal',showBal)
route.get('/show-trans',showTrans)
route.get('/show-invoices',invoicesList)

route.post('/login',userLogin)
route.post('/add-dept',addDept)
route.post('/add-trans',addTrans)

export default route