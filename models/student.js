const mongoose = require('mongoose');



const studentSchema = mongoose.Schema({
fullName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
session:{
    type:String,
    required:true
},
courseName:{
    type:String,
    required:true
},
courseId:{
    type:String,
    required:true
},
fees:{
    type:Number,
    required:true
},
stuImg:{
    type:String,
    required:true
},
stuId:{
    type:String,
    required:true
},
userId:{
    type:String
}
},{timestamps:true});

module.exports=mongoose.model('Student',studentSchema);
