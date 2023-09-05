import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {DATABASE} = process.env;
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

const wonPastrySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    wonDate: {
      type: Date,
      default: Date.now, // Set the default value to the current date and time
    },
  });
  
  // Create the 'WonPastry' model based on the schema
  const WonPastry = mongoose.model('WonPastry', wonPastrySchema);
  
  export default WonPastry;