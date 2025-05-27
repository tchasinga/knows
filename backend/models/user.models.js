import mongoose from 'mongoose'

// creating Schema for user
const userSchema = new mongoose.Schema(
  {
    profilepic: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    password: {
      type: String,
      required: true
    },
    //  addig 1000 ksh payment fee before creating an account
  },
  {
    timestamps: true
  }
)

// creating model for user
const User = mongoose.model('User', userSchema)
// exporting user model
export default User
