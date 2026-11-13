const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({name:{type:String,required:true,unique:true,trim:true},description:{type:String,required:true},sortOrder:{type:Number,default:0}},{timestamps:true});
module.exports = mongoose.model('Service',serviceSchema);
