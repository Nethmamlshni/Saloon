import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true,  trim: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: { type: String, required: true, minlength: 8},
    TPNumber: { type: String, required: true , minlength: 10 , maxlength: 10 , unique: true},
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
export default User;
