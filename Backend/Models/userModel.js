import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Name is required'],
         minlength: [3, 'Name must be at least 3 characters long'], // Custom message for minlength
         maxlength: [50, 'Name cannot exceed 50 characters'], // Custom message for maxlength
         trim: true,

    },
    email:{
        type:String,
        required:true,
         match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        unique:true,
        trim:true,
        lowercase:true
    },
    Password:{
        type:String,
        required:true,
        trim:true,
        minlength: 8
        
    },
},{timestamps:true});


export default mongoose.model("User",userSchema)
