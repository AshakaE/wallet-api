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
    console.log(newUser)

    res.status(200).json({
        status: 'success',
        data: {
            newUser,
        },
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
})
