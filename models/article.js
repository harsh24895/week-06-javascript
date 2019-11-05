const mongoose =require("mongoose");
const Schema=mongoose.Schema;

const article= new Schema({
    title:{
        type:String,
        required:true,

    },
    authors:[String],
    body:String,
    date:{
        type:Date,
        default:Date.now
    }
});

const article=mongoose.model('Article',article);
module.exports=article;
