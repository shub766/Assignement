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