import express, { Router } from "express"
import deliveriesController from "../controllers/deliveriesController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(deliveriesController.getAllDeliveries)
.post(upload.single("image"), deliveriesController.insertDelivery)

router.route("/:id")
.put(upload.single("image"), deliveriesController.updateDelivery)
.delete(deliveriesController.deleteDelivery)

export default router;