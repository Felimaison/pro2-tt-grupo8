const zapatillas = require("../db/data");
const sneakers = require ("../db/data")

const productContoller ={
    product: function (req, res) {
        res.render("product", {title: "Product detail", productos: zapatillas.productos})
    },
    cargarProducto: function (req, res) {
        res.render('productAdd', { usuario: zapatillas.usuario });
    }
}

module.exports = productContoller;