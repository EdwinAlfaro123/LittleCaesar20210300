import nodemailer from "nodemailer" //Enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import jsonwebtoken from "jsonwebtoken" //Token
import bcryptjs from "bcryptjs" //Encriptar contraseña
import {config} from "../../config.js" 

import adminModel from "../models/admin.js"

//array de funciones
const registerAdminController = {}

registerAdminController.register = async (req, res) => {
    try {
        //Solicitar los datos a guardar
        const{name, email, password, isVerified, timeOut} = req.body

        //validar si el correo existe en la base de datos
        const existsAdmin = await adminModel.findOne({ email })
        if(existsAdmin){
            return res.status(400).json({message: "Customer already exists"})
        }

        //Encriptar la contraseña
        const passwordHashed = await bcryptjs.hash(password, 10)

        //Generar un codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //que vamos a guardar?
            {randomCode, name, email, password: passwordHashed, isVerified, timeOut},
            
            //secret key
            config.JWT.secret,
            //cuando expira el token
            {expiresIn: "15m"}
        )

        //Guardamos el token en una cookie
        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})
        
        //ENVIAR AL CORREO ELECTRONICO
        //transporte -  Quien lo envia?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email, 
                pass: config.email.user_password
            }
        })

        //Quien lo recibe?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion de cuenta",
            text: "Para verificar tu cuenta, utiliza este codigo " + 
            randomCode + "Expira en 15 minutos"
        }

        //Enviar el correo electronico
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }

            return res.status(200).json({message: "Email sent"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Verificar el codigo que acabamos de enviar
registerAdminController.verifyCode = async (req, res) => {
    try {
        //Obtenermos el codigo que el usuario escribio en el frotend
        const {verificationCodeRequest} = req.body

        //Obtener el token de las cookies
        const token = req.cookies.registrationCookie

        //Extraer todos los datos del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const{
            randomCode: storedCode,
            name,
            email,
            password,
            isVerified,
            loginAttemps,
            timeOut
        } = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid Code"})
        }

        //Si todo esta bien, y el usuario, lo registramo en la DB
        const newAdmin = adminModel({
            name, email, password, isVerified: true
        })

        await newAdmin.save()

        res.clearCookie("registrationCookie")

        return res.status(200).json({message: "Admin registred"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerAdminController