import mongoose from "mongoose";

const demo = mongoose.Schema({
    dob:{type:String,required:true},
    age:{type:Number,required:true},
},{_id:false})
const mySchema = mongoose.Schema({
    name: {type:String,required:true},
    isAge : {type:Boolean,required:true},

    age: {type: demo, required: function(){return this.isAge} , default: function(){ this.isAge?null: {dob:"af",age:21}}}
})


const myModel = new mongoose.model("/data",mySchema)


const me = new myModel({
    name:"Gourav Patel",
    isAge:false,
    // age:{
    //     dob:"16-11",
    //     age:29
    // }
})

me.validate();
console.log(me)







    
     
     
     
    
    
    
    
    
    
    