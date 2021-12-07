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
            status: 'bad',
            data: 'exceeded',
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
