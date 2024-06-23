var express = require('express');
var router = express.Router();
const productContoller = require('../controllers/productocontroller');

router.get('/id/:id', productContoller.product);

router.get('/add', productContoller.create);
router.post('/add', productContoller.store);

router.post('/editProduct', productContoller.formUpdate);
router.post('/edit', productContoller.update);

router.post('/delete', productContoller.destroy);

module.exports = router;

