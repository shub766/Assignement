import {Cinema}from '../model/cinemaSchema';
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