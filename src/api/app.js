console.log("nodemon working...")
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = 5001
const posts = require('../routes/posts')
const connectDB = require('../database/connect')
const path = require('path')

//middleware 
app.use(express.static(path.join(__dirname, '../webpages')))
app.use(express.json())

//routes
app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.use('/api/v1',posts)

const start = async () => {
    try {
        await connectDB(process.env.NEXT_PUBLIC_MONGO_URI)
        app.listen(port , console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start();

module.exports = app;
