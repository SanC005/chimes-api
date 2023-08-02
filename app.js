console.log("nodemon working...")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env.local') });
const express = require('express')
const app = express()
const port = process.env.NEXT_PUBLIC_PORT || 5001
// console.log(process.env.PORT)
const posts = require('./routes/posts')
const connectDB = require('./database/connect')
const NotFound = require('./middleware/not-found')
//middleware 
app.use(express.static(path.join(__dirname, '../src')))
app.use(express.json())

//routes
// app.get('/', (req,res) => {
//     res.send('Hello World!')
// })

app.use('/api/v1/posts',posts)
app.use(NotFound)

const start = async () => {
    try {
        // console.log(process.env.NEXT_PUBLIC_CHIMES_MONGO_URI)
        await connectDB(process.env.NEXT_PUBLIC_CHIMES_MONGO_URI)
        app.listen(port , console.log(`Server is listening on http://localhost:${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start();