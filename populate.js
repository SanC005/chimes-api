require('dontev').config()
const connectDB = require('./src/database/connect')
const Product = require('./src/model/postModel')
const jsonProduct = require('./populate.json')
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("connected...")
        //await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("Succes!!")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//start()