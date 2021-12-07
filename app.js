import express from 'express'

const app = express()

app.use('/api/v1/users/', userRouter)

export default app
