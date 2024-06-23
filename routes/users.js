var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const perfilController = require('../controllers/perfilcontrollers');
const db = require('../database/models');
const bcrypt = require("bcryptjs");
const session = require('express-session')

let validacionLogin = [
body('email')
.notEmpty().withMessage('Debes colocar un email').bail()
.isEmail().withMessage('El email debe ser correcto').bail()
.custom(function(value, {req}){
    return db.Usuario.findOne({where: { mail: req.body.email },})
          .then(function(user){
                if(user != undefined){ 
                    return true;
                }
                else{
                    throw new Error ('Este email no existe')
                }
          })
}),

body('password')
.notEmpty().withMessage('Debes de rellenar la contraseña').bail()
.custom(function(value, {req}){

    return db.Usuario.findOne({where: { mail: req.body.email },})
          .then(function(result){
                if(result != undefined){ 

                    let check = bcrypt.compareSync(req.body.password, result.contrasenia);
                    if(!check){
                        throw new Error ('La contraseña no es correcta')
                    }
                }
                else{
                    throw new Error ('Debes registrarte primero para poder acceder')
                }
          })

})
]




router.get('/login', perfilController.login);
router.post("/login",validacionLogin, perfilController.loginUser);

router.get('/register', perfilController.register);
router.post('/register', perfilController.store);

router.get('/profile', perfilController.profile);

router.get('/edit', perfilController.edit);

router.post('/logout', perfilController.logout);

module.exports = router;
