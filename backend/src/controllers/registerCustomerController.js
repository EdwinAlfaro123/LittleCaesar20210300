import nodemailer from "nodemailer" //Enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import jsonwebtoken from "jsonwebtoken" //Token
import bcryptojs from "bcryptojs" //Encriptar contraseña
import {config} from "../../config.js" 

import customerModel from "../models/customers.js"

//array de funciones
const registerCustomerController = {}

registerCustomerController.register = async (req, res) => {
    try {
        //Solicitar los datos a guardar
        const{name, lastName, birthdate, email, password, isVerified, timeOut} = req.body

        //validar si el correo existe en la base de datos
        const existsCustomer = await customerModel.findOne({ email })
        if(existsCustomer){
            return res.status(400).json({message: "Customer already exists"})
        }

        //Encriptar la contraseña
        const passwordHashed = await bcryptojs.hash(password, 10)

        //Generar un codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //que vamos a guardar?
            {randomCode, name, lastName, birthdate, email, password: passwordHashed, isVerified, timeOut},
            
            //secret key
            config.JWT.secret,
            //cuando expira el token
            {expiresIn: "15m"}
        )

        //Guardamos el token en una cookie
        res.cookie("RegistrationCookie", token, {maxAge: 15 * 60 * 1000})
    } catch (error) {
        
    }
}