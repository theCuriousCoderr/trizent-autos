import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String, required: true, maxLength:11 },
    address:String,
    city: String,
    country: String,
    loggedIn: String
});

export const User = mongoose.model("User", userSchema);
