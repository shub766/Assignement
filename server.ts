import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import {Cinema} from './model/cinemaSchema'
import {cinemaRouter} from './routes/cinemaRouter';
mongoose.connect('mongodb://localhost:27017/cinema');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const app = express();
app.use(express.json());

//Routing
app.use('/cinemas', cinemaRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
