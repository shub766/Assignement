import express, { Express } from "express";
import {cinemaName,seatNumber,consecutive}  from '../controller/cinemaController';

export const cinemaRouter:any = express.Router()
cinemaRouter.post('/cinemaName', cinemaName  );
cinemaRouter.post('/cinemas/:cinemaId/purchase/:seatNumber', seatNumber  );
cinemaRouter.post('/cinemas/:cinemaId/purchase-consecutive', consecutive  );