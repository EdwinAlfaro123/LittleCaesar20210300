import express, { Router } from "express"
import customerController  from "../controllers/customerController.js"

const router = express.Router()

route.route(":/")
.get(customerController.getCustomers)

route.route(":/id")
.put(customerController.putCustomers)
.delete(customerController.deleteCustomer)

export default router;