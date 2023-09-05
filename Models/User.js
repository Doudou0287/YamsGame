import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {DATABASE} = process.env;
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a User schema and model
const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    unique: true ,
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
});

const User = mongoose.model('User', UserSchema);

export default User;