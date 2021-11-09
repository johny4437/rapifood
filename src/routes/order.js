const {
    create,
    listOrders,
    listOneOrder,
    removeOrder
} = require('../controllers/order');

const router =  require('express').Router();
const {requireSingin} = require('../controllers/user');

router.post('/order', requireSingin, create);
router.get('/orders',requireSingin, listOrders);
router.get('/order/:id', requireSingin, listOneOrder);
router.delete('/order/:id', requireSingin, removeOrder);

module.exports =  router;

//, requireSingin, multer(multerConfig).array('images', 5)