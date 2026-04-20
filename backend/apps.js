import express from "express";
import pizzaRoutes from "./src/routes/pizzas.js"
import brancheRoutes from "./src/routes/branches.js"
import employeesRoutes from "./src/routes/employees.js";
import reviewsRoutes from "./src/routes/reviews.js";
import customerRoutes from "./src/routes/customer.js"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import registerEmployeeRoutes from "./src/routes/registerEmployee.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import logoutRoutes from "./src/routes/logout.js"
import cookieParser from "cookie-parser";

//Creo una constante que es igual a
//La libreria Express
const app = express();

app.use(cookieParser())

//Para que la API acepte json
app.use(express.json())

app.use("/api/pizzas", pizzaRoutes) ;
app.use("/api/branches", brancheRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/regsiterEmployee", registerEmployeeRoutes)
app.use("/api/loginCustomers", loginCustomerRoutes)
app.use("/api/logout", logoutRoutes)

export default app;