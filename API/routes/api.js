var express = require('express');
var router = express.Router();
const clientCtrl= require('../controllers/clientsCtrl');
const productCtrl= require('../controllers/productCtrl');
const orderCtrl= require('../controllers/orderCtrl');

/*Client methods*/
router.post('/client', clientCtrl.save);
router.get('/client', clientCtrl.getAll);
router.get('/client/:id/orders', clientCtrl.getClientOrders);
/*Product methods*/
router.post('/product', productCtrl.save);
router.get('/product', productCtrl.getAll);
/*Order methods*/
router.post('/order', orderCtrl.save);
router.get('/order', orderCtrl.getAll);


module.exports = router;