const User = require('./../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.createUser = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead.',
    })
})

exports.generatePaymentId = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user.paymentId.length === 5) {
        res.status(400).json({
            status: 'Not allowed',
            data: 'Payment ID limit exceeded!',
        })
        next()
    } else {
        const newId = [...Array(7)]
            .map((e) => ((Math.random() * 36) | 0).toString(36))
            .join('')

        await User.findByIdAndUpdate(req.params.id, {
            $push: { paymentId: newId },
        })

        res.status(200).json({
            status: 'success',
            data: {
                data: newId,
            },
        })
        next()
    }
    next()
})

exports.deletePaymentId = catchAsync(async (req, res, next) => {
    const val = req.body.option
    const user = await User.findById(req.params.id)
    if (user.paymentId.length === 1) {
        res.status(400).json({
            status: 'Not allowed',
            data: 'payment IDs must contain atleast one ID',
        })
    } else if (user.paymentId.includes(val)) {
        await User.findByIdAndUpdate(req.params.id, {
            $pull: { paymentId: val },
        })

        res.status(200).json({
            status: 'success',
            data: {
                data: `payment Id '${val}' deleted successfully`,
            },
        })
        next()
    } else {
        res.status(404).json({
            status: 'Not found',
            data: {
                data: `payment Id - '${val}' not found!`,
            },
        })

        next()
    }
    next()
})

exports.findUserByPaymentId = catchAsync(async (req, res, next) => {
    const user = await User.find({ paymentId: req.body.paymentId }).select(
        '-_id -email -phoneNumber',
    )
    if (user) {
        res.status(200).json({
            status: 'success',
            data: {
                data: user,
            },
        })
    } else {
        res.status(400).json({
            status: 'Not Found',
            data: 'User not found!',
        })
    }
})
