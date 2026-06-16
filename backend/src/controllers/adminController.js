const AdminController = {}

import admin from "../models/admin.js"
import adminModel from "../models/admin.js"

AdminController.getAdmin = async(req, res) => {
    try {
        const admin = await adminModel.find()
        return res.status(200).json(admin)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

AdminController.putAdmin = async(req, res) => {
    try {
        //Solicitar los datos nuevos
        let {
            name,
            email,
            password,
            isVerified
        } = req.body
        //Validaciones
        //Sanitizar
        name = name?.trim()
        email = email?.trim()

        //Validaciones
        if(!name || !email){
            return res.status(400).json({message: "Fields required"})
        }

        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Please insert a valid name"})
        }

        //Actuzalizamos en la base de datos
        const putAdmin = await adminModel.findByIdAndUpdate(req.params.id,
            {
                name,
                email,
                password,
                isVerified,
            },{new: true},
        )

        if(!putAdmin){
            return res.status(404).json({message: "Admin not found"})
        }

        return res.status(200).json({message: "Admin updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//Eliminar

AdminController.deleteAdmin = async(req, res) => {
    try {
        const deleteAdmin = await adminModel.findByIdAndDelete(req.params.id)

        if(!deleteAdmin){
            return res.status(404).json({message: "Admin not found"})
        }

        return res.status(200).json({message: "Admin deleted"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default AdminController