const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const articleSchema= new Schema({
    title:{
        type: String,
        required:true,

    },
    authors:[String],
    body:String,
    date:{
        type:Date,
        default:Date.now
    }
});
//create a model based on the above schema
const article = mongoose.model('Article',articleSchema);

module.exports=article;
