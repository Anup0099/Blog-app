const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },//username is a string and is required.   username is a unique field.     username is a unique field.
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("Password cannot contain 'password'");
            }
        }

    },
    
    profilePic: {
        type: String,
        default: ""

    },
   



}//end of UserSchema    UserSchema is a mongoose schema.  It is used to define the structure of the documents in the collection.    



,{timestamps: true})// timestamps: true adds createdAt and updatedAt fields to the schema.  The default value is false.    The timestamps option is used to automatically add timestamps to the documents.  The default value is false.


module.exports =    mongoose.model("User", UserSchema);