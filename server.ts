import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import {Cinema} from './model/cinemaSchema'
import {cinemaRouter} from './routes/cinemaRouter';
import cluster from 'cluster';
import os from 'os';

mongoose.connect('mongodb://localhost:27017/cinema');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();
app.use(express.json());

//Routing
app.use('/cinemas', cinemaRouter);

if(cluster.isMaster){
  const workers = os.cpus().length;
  for(let i=0;i<workers;i++){
    cluster.fork();
  }

  cluster.on('online',(worker)=> {
    console.log(`worker started with a PID of:${worker.process.pid}`);
  });

  cluster.on('exit',(worker,code,signal) => {
    console.log(`worker died with a PID of:${worker.process.pid}`);
    cluster.fork();

  });
} else {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}
