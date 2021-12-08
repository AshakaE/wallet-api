const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app.js')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
)

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message)
    process.exit(1)
})

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection succesful!')
    })

const port = process.env.PORT || 3500

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
})
