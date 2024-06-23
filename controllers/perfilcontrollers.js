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
        res.render("login", {title: "Login"});
    },
    register: function(req, res, next){
        res.render("register", {title:"Register"});
    }
}; 

module.exports = perfilContoller;
