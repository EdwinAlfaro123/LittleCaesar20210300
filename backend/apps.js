import express from "express";
import pizzaRoutes from "./src/routes/pizzas.js"
import brancheRoutes from "./src/routes/branches.js"

//Creo una constante que es igual a
//La libreria Express
const app = express();

//Para que la API acepte json
app.use(express.json())

app.use("/api/pizzas", pizzaRoutes) ;
app.use("/api/branches", brancheRoutes)

export default app;