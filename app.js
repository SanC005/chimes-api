console.log("nodemon working...")
const express = require('express')
const app = express()
const port = 5001
const posts = require('./routes/posts')

//middleware 
app.use(express.json())

//routes
app.get('/hello', (req,res) => {
    res.send('Hello World!')
})

app.use('/api/v1/posts',posts)

app.listen(port , console.log(`Server is listening on http://localhost/${port}...`))