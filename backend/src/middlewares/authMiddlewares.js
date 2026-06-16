import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            // extraer el token que esta en la cookie (authCookie)
            //ya en esa cookie esta el tipo de usuario guardado
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found, Authorization required"})
            }
            
            //extraer toda la informacion de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret);

            //Verificar si el rol que tiene la cookie puede pasar o no
            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Acceso denegado"})
            }

            //Si el rol si esta podemos continuar
            next()
        } catch (error) {
            console.log("error" + error)
            return res.status(500).json({message: "Internal Server Error"})
        }
    }
}