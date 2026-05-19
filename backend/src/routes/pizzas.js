import express from "express";
import pizzasController from "../controllers/pizzasController.js";

//Router() nos ayuda a colocar los metodos que tendrá el endpoint

const router = express.Router();

router.route("/")
.get(pizzasController.getPizzas)
.post(pizzasController.insertPizza)

router.route("/low-cost")
.get(pizzasController.getLowStock)

router.route("/price-range")
.get(pizzasController.getPizzaPriceRange)

router.route("/count")
.get(pizzasController.countPizzas)

router.route("/search-name")
.get(pizzasController.searchByName)

router.route("/:id")
.put(pizzasController.updatePizza)
.delete(pizzasController.deletePizza)
.get(pizzasController.getPizzasById)

export default router;