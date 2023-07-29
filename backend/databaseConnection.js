const mongoose=require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/photoapp';
const connectToMongoDb=()=>{
mongoose.connect(mongoURI).then(()=>{
    console.log("connected to mongodb successfully")
})
}
module.exports=connectToMongoDb