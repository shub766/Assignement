import {Cinema}from '../model/cinemaSchema';
import Redlock from 'redlock';
import { createClient } from 'redis';


const redisClient = createClient();
const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 10,
  retryDelay: 200,
  retryJitter: 200,
});

export const  cinemaName:any = async (req: Request, res: any) => {
  let reqObj:any=req.body;
  let { cinemaName,seats} = reqObj;
  const cinema = new Cinema({
    cinemaName:cinemaName,
    seats: Array(seats).fill(0),
  });
  try {
    const savedCinema = await cinema.save();
    res.json({ cinemaId: savedCinema._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create cinema.' });
  }
};

export  const seatNumber:any =  async (req: any, res: any) => {
    let reqObj = req.params;
    const { cinemaId, seatNumber} = reqObj;
  
    try {
      const cinema = await Cinema.findById(cinemaId);
      if (!cinema) {
        res.status(404).json({ error: 'Cinema not found.' });
        return;
      }
    //   const lock = await redlock.lock(cinemaId, 1000);
      if (cinema.seats[seatNumber - 1] === 1) {
        res.status(400).json({ error: 'Seat already purchased.' });
        return;
      }
  
      cinema.seats[seatNumber - 1] = 1;
      await cinema.save();
  
      res.json({ seat: seatNumber });
    } catch (error) {
      res.status(500).json({ error: 'Failed to purchase seat.' });
    }
};

export  const consecutive:any = async (req: any, res: any) => {
    const { cinemaId } = req.params;
  
    try {
      const cinema = await Cinema.findById(cinemaId);
      if (!cinema) {
        res.status(404).json({ error: 'Cinema not found.' });
        return;
      }
  
      const seats = cinema.seats;
  
      let startIndex = -1;
      for (let i = 0; i < seats.length - 1; i++) {
        if (seats[i] === 0 && seats[i + 1] === 0) {
          startIndex = i;
          break;
        }
      }
  
      if (startIndex === -1) {
        res.status(400).json({ error: 'No consecutive seats available.' });
        return;
      }
  
      seats[startIndex] = 1;
      seats[startIndex + 1] = 1;
      await cinema.save();
  
      res.json({ seats: [startIndex + 1, startIndex + 2] });
    } catch (error) {
      res.status(500).json({ error: 'Failed to purchase consecutive seats.' });
    }
  };