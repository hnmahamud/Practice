const express = require('express');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const {check} = require('express-validator/check');

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    [
        check('title', 'Please enter a valid title with minimum 3 characters.')
            .isString()
            .isLength({min: 3})
            .trim(),
        check('price', 'Please enter valid price.')
            .isFloat(),
        check('description', 'Please enter valid description with minimum 5 and maximum 400 characters.')
            .isLength({min: 5, max: 400})
            .trim()
    ],
    isAuth,
    adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    [
        check('title', 'Please enter a valid title with minimum 3 characters.')
            .isString()
            .isLength({min: 3})
            .trim(),
        check('imageUrl', 'Please enter valid URL.')
            .isURL(),
        check('price', 'Please enter valid price.')
            .isFloat(),
        check('description', 'Please enter valid description with minimum 5 and maximum 400 characters.')
            .isLength({min: 5, max: 400})
            .trim()
    ],
    isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
