console.log("nodemon working...")
const express = require('express')
const app = express()
const port = 5001
const posts = require('./routes/posts')
const connectDB = require('./database/connect')
require('dotenv').config()


//middleware 
app.use(express.json())

//routes
app.get('/hello', (req,res) => {
    res.send('Hello World!')
})

app.use('/api/v1/posts',posts)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port , console.log(`Server is listening on http://localhost/${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start();