const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please enter your phone number'],
    },
    paymentId: {
        type: [String],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm password '],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same',
        },
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre('save', function (next) {
    this.paymentId = [...Array(7)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('')
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
