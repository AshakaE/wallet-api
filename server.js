import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD,
)

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection succesful!')
    })

const port = process.env.PORT || 3500

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
