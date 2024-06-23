const zapatillas = require('../db/data')
const zapas = require("../db/data")
const usuario = zapatillas.usuario;

const perfilContoller = {
    profile: function (req, res, next) {
        let idUsuario = req.params.id
        let nombreZapa = [];
        let descripcionZapa = [];
        let comentarios = [];
        let imagenes = [];
        let id = [];
        for (let i = 0; i < zapatillas.productos.length; i++) {
            nombreZapa.push(zapatillas.productos[i].nombre);
            descripcionZapa.push(zapatillas.productos[i].descripcion);
            comentarios.push(zapatillas.productos[i].comentarios);
            imagenes.push(zapatillas.productos[i].imagen);
            id.push(zapatillas.productos[i].id);
        }
        res.render("profile", {
            title: nombreZapa,
            descripcion: descripcionZapa,
            comentarios: comentarios,
            imagen: imagenes,
            id: id,
            usuario: usuario,
        });
    },
    edit: function(req, res, next) {
        res.render("profileEdit", {title: "Profile Edit", usuario: zapatillas.usuario});
    },
    login: function(req, res, next){

        if (req.session.user != undefined) {
            return res.redirect("/users/profile/id/" + req.session.user.id)
        } else {
            return res.render("login", {title: "Login"})
        }
    },

    loginUser: (req, res, next) => {

        let form = req.body;
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            
            let filtrar = {
                where: [
                {mail: form.email}
                ]
            }
    
        db.Usuario.findOne(filtrar)
            .then((result) => {
                if (result != null) {
                    
                    req.session.user = result;
                    if (form.remember != undefined) {
                        res.cookie("userId", result.id, {maxAge: 1000 * 60 * 35})
                    }
                    return res.redirect("/users/profile/id/" + result.id);
                } 
                else {
                    return res.redirect("/users/login");
                }
    
            })
            .catch((err) => {
                return console.log(err);
            });
        }
        else{
            res.render('login', {title: "Login", errors: errors.mapped(),  old: req.body, user: req.session.user});
        }
    },
    
    register: function(req, res, next){
        if (req.session.user != undefined) {
        return res.redirect("/users/profile/id" + req.session.user.id);
    }
    else {
        return res.render("register", {title: "Register"})
    }
}
}; 

module.exports = perfilContoller;
