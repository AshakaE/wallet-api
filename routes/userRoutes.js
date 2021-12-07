const express = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router()

router
    .post('/signup', authController.signup)
    .post('/login', authController.login)

router
    .patch('/getPaymentId/:id', userController.generatePaymentId)
    .patch('/deletePaymentId/:id', userController.deletePaymentId)

router.get('/', userController.findUserByPaymentId)

module.exports = router
