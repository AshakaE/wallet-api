const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes.js')

const app = express()

app.options('*', cors())

app.options('*', cors())

app.use(express.json({ limit: '10kb' }))

app.use('/api/v1/users/', userRouter)

module.exports = app
