var express = require('express');
var router = express.Router();
const productContoller = require('../controllers/productocontroller');
const { body } = require('express-validator');

let validacionAgregar = [
    body('nombreProd')
        .notEmpty().withMessage('El producto debe tener un nombre'),
    body('descripcion')
        .notEmpty().withMessage('Debes agregar una descripción'),
    body('imagenProd')
        .notEmpty().withMessage('Debes agregar una imagen').bail()
        .isURL().withMessage('La URL de la imagen no es valida')
]



router.get('/id/:id', productContoller.product);
router.post('/id/:id',validacionComentario, productContoller.comment);

router.get('/add', productContoller.create);
router.post('/add',validacionAgregar, productContoller.store);

router.post('/editProduct', productContoller.formUpdate);
router.post('/edit', productContoller.update);

router.post('/delete', productContoller.destroy);

module.exports = router;

