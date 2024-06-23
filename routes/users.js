var express = require('express');
var router = express.Router();
const perfilController = require('../controllers/perfilcontrollers');

router.get('/login', perfilController.login);
router.post("/login", perfilController.loginUser);

router.get('/register', perfilController.register);
router.post('/register', perfilController.store);

router.get('/profile', perfilController.profile);

router.get('/edit', perfilController.edit);

router.post('/logout', perfilController.logout);

module.exports = router;
