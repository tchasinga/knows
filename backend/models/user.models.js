import { Schema } from "mongoose";


// creating Schema for user 
const userSchema = new Schema({
    profilepic : {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

// creating model for user
const User = mongoose.model("User", userSchema);
// exporting user model
export default User;