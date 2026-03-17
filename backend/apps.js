import express from "express";
import pizzaRoutes from "./src/routes/pizzas.js"

//Creo una constante que es igual a
//La libreria Express
const app = express();

//Para que la API acepte json
app.use(express.json())

app.use("/api/pizzas", pizzaRoutes) ;

export default app;