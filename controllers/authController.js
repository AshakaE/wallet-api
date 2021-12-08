const User = require('./../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    })

    res.status(200).json({
        status: 'success',
        data: {
            newUser,
        },
    })
    next()
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (email && password) {
        const user = await User.findOne({ email })

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        })
        next()
    }
    next()
})
