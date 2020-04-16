const express = require('express');
const authController = require('../controllers/auth');
const {check} = require('express-validator/check');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        check('email', 'Please enter a valid email address.')
            .isEmail()
            .normalizeEmail(),
        check('password', 'Please enter valid password with alphanumeric and at least 5 characters')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim()
    ] ,
    authController.postLogin);

router.post('/signup',
    [
        check('email', 'Please enter a valid email')
            .isEmail()
            .normalizeEmail()
            .custom((value, {req}) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email already taken!');
                        }
                    });
            }),
        check('password', 'Please enter valid password with alphanumeric and at least 5 characters')
            .isAlphanumeric()
            .isLength({min: 5})
            .trim(),
        check('confirmPassword')
            .trim()
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error('Password do not match!');
                }
                return true
            })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;