const zapatillas = require('../db/data')
const zapas = require("../db/data")
const usuario = zapatillas.usuario;

const perfilContoller = {
    profile: function(req, res, next) {

        let id = req.params.id;

        let regla = {
            include: [
                {association: "productos"},
                {association: "comentarios"}
            ],
            order: [
                [{model: db.Product, as: 'productos'}, 'createdAt', 'DESC']
            ]
        }
    
        db.Usuario.findByPk(id, regla)

            .then(function(results){

                let condicion = false;

                if (req.session.user != undefined && req.session.user.id == results.id) {
                    condicion = true;
                }

                return res.render('profile', {title: `@${results.usuario}`, usuario: results, productos: results.productos, comentarios: results.comentarios.length, condition: condicion});
            })
            .catch(function(error){
                console.log(error);
            });
    },
    edit: function(req, res, next) {

        if (req.session.user != undefined) {

            id = req.session.user.id;
            db.Usuario.findByPk(id)
        .then(function (results) {
            return res.render("profileEdit", {title:"Profile Edit", usuario: results});
        })
        .catch(function (err) {
            console.log(err);
        });
        }
        else{
            return res.redirect("/users/login");
        }
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
    logout: (req,res, next) => {
        req.session.destroy();
        res.clearCookie("userId")
        return res.redirect("/")
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
