const mongoose = require('mongoose');



const courseSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
courseImg:{
    type:String,
    required:true
},
duration:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
fees:{
    type:String,
    required:true
},
userId:{
    type:String
}
},{timestamps:true});

module.exports=mongoose.model('Course',courseSchema);
