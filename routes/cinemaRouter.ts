import express, { Express } from "express";
import {cinemaName}  from '../controller/cinemaController';

export const cinemaRouter:any = express.Router()
cinemaRouter.post('/cinemaName', cinemaName  );