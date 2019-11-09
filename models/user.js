const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema= new Schema({});

userSchema.plugin(passportLocalMongoose); 
// it use the bridge between mangoose as passport local


//create a model based on the above schema
const user = mongoose.model('User',userSchema);

module.exports=user;
