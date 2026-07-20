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
import RecoveryPassword from "./src/routes/recoveryPassword.js"
import providersRoutes from "./src/routes/providers.js"
import cartRoutes from "./src/routes/cart.js"
import WompiRoute from "./src/routes/wompi.js"
import deliveriesRoutes from "./src/routes/deliveries.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {validateAuthCookie} from "./src/middlewares/authMiddlewares.js"
import RegisteradminRoute from "./src/routes/registerAdmin.js"
import adminRoutes from "./src/routes/admin.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js";
import limiter from "./src/middlewares/limiter.js"

import swaggerUI from "swagger-ui-express"
import swaggerDocument from "./src/utils/antibots-LittleCaesarAPI-1.0-resolved.json" with {type: "json"}
//Creo una constante que es igual a
//La libreria Express
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}))

app.use(cookieParser())

app.use(limiter)

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

//Para que la API acepte json
app.use(express.json()) 

app.use("/api/pizzas", pizzaRoutes) ;
app.use("/api/branches", brancheRoutes)
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/regsiterEmployee", registerEmployeeRoutes)
app.use("/api/loginCustomers", loginCustomerRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/recoveryPassword", RecoveryPassword)
app.use("/api/providers", providersRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wompi", WompiRoute)
app.use("/api/deliveries", deliveriesRoutes)
app.use("/api/registerAdmin", RegisteradminRoute)
app.use("/api/admin", validateAuthCookie(["admin"]), adminRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)


export default app;