import deliveriesModel from "../models/deliveries.js"
import {v2 as cloudinary} from "cloudinary"

const deliveriesController = {}

deliveriesController.getAllDeliveries = async (req, res) => {
    try {
        const deliveries = await deliveriesModel.find()
        return res.status(200).json(deliveries)
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

deliveriesController.insertDelivery = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body

        const newDelivery = new deliveriesModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        await newDelivery.save()
        return res.status(200).json({message: "Delivery inserted successfully"})
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

deliveriesController.updateDelivery = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body
        const deliveryFound = await deliveriesModel.findById(req.params.id)

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        if(req.file){
            await cloudinary.uploader.destroy(deliveryFound.public_id)
            updatedData.image = req.file.path
            updatedData.public_id = req.file.filename
        }

        await deliveriesModel.findByIdAndUpdate(req.params.id,
            updatedData,{
                new: true
            }
        )

        return res.status(200).json({message: "Delivery updated successfully"})
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

deliveriesController.deleteDelivery = async (req, res) => {
    try {
        const deliveryFound = await deliveriesModel.findById(req.params.id)

        await cloudinary.uploader.destroy(deliveryFound.public_id)

        const deliveryDeleted = await deliveriesModel.findByIdAndDelete(req.params.id)

        if(!deliveryDeleted){
            return res.status(404).json({message: "Delivery not found"})
        }
        return res.status(200).json({message: "Delivery deleted successfully"})
    } catch (error) {
        console.error("error" + error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default deliveriesController