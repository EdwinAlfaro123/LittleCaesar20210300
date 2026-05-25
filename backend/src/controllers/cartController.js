import cartModel from "../models/cart.js";
import pizzaModel from "../models/pizzas.js";


const cartController = {}

cartController.getCart = async (req, res) => { 
    try {
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name")

        return res.status(200).json(carts)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

cartController.addToCart = async (req, res) => {
    try {
        //Solicitar datos
        const {customerId, products, status} = req.body
        
        //Guardar total
        let total = 0

        //Arreglo de productos
        let newProducts= []

        //De todos los productos que me envie el frontend
        //Los voy a recorrer uno por uno para
        //calcular el subtotal y el total

        for(let i = 0; i < products.length; i++){
            //Buscar el producto en la base de datos
            const pizzaFound = await pizzaModel.findById(products[i].productId)

            //calcular el subtotal
            const subtotal = pizzaFound.price * products[i].quantity

            //calcular el total
            total += subtotal

            //Guardamos el producto junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        //llenamos el modelo
        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total,
            status
        })

        //Guardar el carrito en la base de datos
        await newCart.save()
        return res.status(201).json(newCart)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

cartController.updateCart = async (req, res) => {
    try {
        //Solicitar datos
        const {customerId, products, status} = req.body

        //Variable para el total
        let total = 0
        
        //Arreglo de productos
        let newProducts= []

        //Recorrer todos los datos
        for(let i = 0; i < products.length; i++){
            //Buscar el producto en la base de datos
            const pizzaFound = await pizzaModel.findById(products[i].productId)

            //calcular el subtotal
            const subtotal = pizzaFound.price * products[i].quantity

            //calcular el total
            total += subtotal

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        const updatedCart = await cartModel.findByIdAndUpdate(req.params.id,
            {
                customerId,
                products: newProducts,
                total,
                status
            },
            {new: true}
        )
        return res.status(200).json(updatedCart)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

cartController.deleteCart = async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Cart deleted successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default cartController;