import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {DATABASE} = process.env;
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

const pastrySchema = new mongoose.Schema({
  name: String,
  number: Number,
  order: Number,
});

const Pastry = mongoose.model('Pastry', pastrySchema);

export default Pastry;