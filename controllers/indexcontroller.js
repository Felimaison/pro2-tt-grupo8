const zapatillas = require('../db/data')
const zapas = require('../db/data')
 
const indexController = {
    index: function (req, res) {
        let nombreZapa = []
        let descripcionZapa = []
        let comentarios = []
        let imagenes = []
        let id = []
        for (let i = 0; i < zapatillas.productos.length; i++) {
            nombreZapa.push(zapatillas.productos[i].nombre)
            descripcionZapa.push(zapatillas.productos[i].descripcion)
            comentarios.push(zapatillas.productos[i].comentarios)
            imagenes.push(zapatillas.productos[i].imagen)
            id.push(zapatillas.productos[i].id)

            
        }
        res.render("index", { title: nombreZapa,
            descripcion: descripcionZapa,
            comentarios:comentarios,
            imagen: imagenes,
            id: id
         });
    },
    search: function(req, res, next){
        res.render("searchResults", {title:"Search results", productos: zapatillas.productos})
         }
}

module.exports = indexController