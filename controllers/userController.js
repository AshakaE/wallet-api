const catchAsync = require('../utils/catchAsync')

exports.createUser = catchAsync(async (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead.',
    })
})
