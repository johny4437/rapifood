const {createProduct, readProducts} = require('../controllers/products');

const router =  require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const {requireSingin} = require('../controllers/user');

router.post('/products',requireSingin, multer(multerConfig).array('images', 5), createProduct);
router.get('/products', readProducts);

module.exports =  router;

//, requireSingin, multer(multerConfig).array('images', 5)