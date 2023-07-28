console.log("nodemon working...")
import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 8080;
// mongoose.connect("mongodb+srv://sandeep:FgBNfvhtsAlgBzPn@chimescluster.khxqh7j.mongodb.net/?retryWrites=true&w=majority").then(
//     (x) => {app.listen(8080,() =>{console.log("listening")})}
// ).then(
//     (x) => {console.log(app.listen(PORT,() => console.log(`Connected to Database and listening on http://localhost:${PORT}`)))}
// ).catch(
//     (e) => {console.log(e)}
// )
//FgBNfvhtsAlgBzPn


const connect = () => {
    mongoose.connect("mongodb+srv://sandeep:FgBNfvhtsAlgBzPn@chimescluster.khxqh7j.mongodb.net/?retryWrites=true&w=majority").then((x)=>{
        console.log("/////////////////////")
        // console.log(x)
        console.log("/////////////////////")
        console.log(`Connect to Database and listening on http://localhost:${PORT}`)
    }).catch((err)=> {
        console.log(err)
    })
}

app.listen(8080,()=> {
    console.log("Listening...")
    connect()
})
app.get(PORT,(req,res) => {

})
