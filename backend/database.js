import mongoose from "mongoose";
import {config} from "../backend/config.js"

mongoose.connect(config.db.uri)

//Comprobar que todo funciona

//Creo una constante que es igual a la conexion de la base de datos
const connection = mongoose.connection;

connection.on("open", ()=>{
    console.log("Base de datos conectada");
})

connection.on("disconnected", ()=>{
    console.log("Desconectado de la base de datos");
})

connection.on("error", (error)=>{
    console.log("Error en la conexion a la base de datos: " + error);
})