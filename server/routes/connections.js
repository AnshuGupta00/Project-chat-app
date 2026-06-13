const mongoose=require('mongoose');

const connectionSchema=new mongoose.Schema({
    senderID:{type:mongoose.Schema.Types.ObjectID,ref:'User',required:true},
    reciverID:{type:mongoose.Schema.Types.ObjectID,ref:'User',required:true},
    status:{type:string,enum:['pending','accepted','rejected'],default: 'pending'},

}, {timestamps:true});

module.exports=mongoose.model('connection',connectionSchema);