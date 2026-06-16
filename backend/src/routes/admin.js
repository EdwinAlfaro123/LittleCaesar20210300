import express, { Router } from "express"
import adminController  from "../controllers/adminController.js"

const router = express.Router()

router.route("/")
.get(adminController.getAdmin)

router.route("/:id")
.put(adminController.putAdmin)
.delete(adminController.deleteAdmin)

export default router;