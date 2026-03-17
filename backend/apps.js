import express from "express";

//Creo una constante que es igual a
//La libreria Express
const app = express();

app.use("/api/pizzas") ;

export default app;