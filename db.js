const mongoose = require('mongoose');

// const mongoUR2I = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
// const mongoURI = "mongodb+srv://Atharv:Atharv@cluster0.wbnxb32.mongodb.net/?retryWrites=true&w=majority/Blogify"
// const mongoURI="mongodb+srv://Atharv:Atharv@cluster0.wbnxb32.mongodb.net/?retryWrites=true&w=majority"
const mongoURI = "mongodb+srv://street:coding123-@streetwears.3wjrjub.mongodb.net"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;