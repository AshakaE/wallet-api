const express = require('express')
const userRouter = require('./routes/userRoutes.js')

const app = express()

app.use(express.json({ limit: '10kb' }))

app.use('/api/v1/users/', userRouter)

module.exports = app
