const zapatillas = require("../db/data");
const sneakers = require ("../db/data")

const productContoller ={
    product: function (req, res) {
        res.render("product", {title: "Product detail", productos: zapatillas.productos})
    },
    create: function(req, res) {
        if(req.session.user != undefined){
            return res.render("productAdd",{title: "Add Product"})
        }
        else{
            return res.redirect("/users/login")
        }
        
    },

    store: function(req, res) {
        let form = req.body;
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            
            db.Product.create(form)
            .then((result) => {
                return res.redirect("/product/id/" + result.id)
            }).catch((err) =>{
                return console.log(err);
            });
        }
        else{
            return res.render("productAdd", {errors: errors.mapped(), old:req.body});
        }
    },

    delete: function(req, res) {
        let form = req.body;
        
        let filtrado = {
          where: {
            id: form.id
          }
        }  
        
       if (req.session.user != undefined) {
            let id = req.session.user.id;
            if (form.idUsuario == id) {
                db.Product.destroy(filtrado)
                .then((result) => {
                  return res.redirect("/");
                })
                .catch((err) => {
                  return console.log(err);
                });
            }
            else{
                return res.redirect("/users/profile/id/" + id);
            }
        }
        else{
            return res.redirect("/users/login");
        }  
    },  
    comment: function(req,res) {
        let form = req.body;
        let errors = validationResult(req);
        
        if (errors.isEmpty()) {
            let comentario = {
                clienteId: req.session.user.id,
                productoId: req.params.id,
                comentario: form.comentario
            }
            
    
            db.Comentario.create(comentario)
            .then((result) => {
                return res.redirect("/product/id/" + req.params.id)
            }).catch((err) => {
                return console.log(err);
            });
        } 
        else {
            let id = req.params.id;
    
            let condition = false;
    
            let criterio = {
                include: [
                    {association: "usuario"},
                    {association: "comentarios", 
                    include: [{association: 'usuario'} 
                    ]}
                ],
                order: [[{model: db.Comentario, as: 'comentarios'}, 'createdAt', 'DESC']]
            }
    
            db.Product.findByPk(id, criterio)
            .then(function(results){
    
                if (req.session.user != undefined && req.session.user.id == results.usuario.id) {
                    condition = true;
                }
    
                return res.render('product', {title:"Product", productos: results, comentarios: results.comentarios, condition: condition, errors: errors.mapped(), old: req.body})})
            
                .catch(function(error){
                console.log(error);
            });   
        }
    }  
}

module.exports = productContoller;