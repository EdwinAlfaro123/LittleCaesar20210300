import express from "express";
import pizzaRoutes from "./src/routes/pizzas.js"
import brancheRoutes from "./src/routes/branches.js"
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js";

//Creo una constante que es igual a
//La libreria Express
const app = express();

//Para que la API acepte json
app.use(express.json())

app.use("/api/pizzas", pizzaRoutes) ;
app.use("/api/branches", brancheRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)

export default app;