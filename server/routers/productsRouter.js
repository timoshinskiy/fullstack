const {Router} = require('express');
const router = new Router();
const controller = require('../controllers/productsController.js');

router.get('/catalog',controller.getProducts)
router.put('/edit',controller.editProduct)
router.get('/remove/:id',controller.removeProduct)
router.post('/add',controller.addProduct)
router.get('/product/:id',controller.getProduct)
router.get('/admin/:username',controller.getAdminProducts)


module.exports = router