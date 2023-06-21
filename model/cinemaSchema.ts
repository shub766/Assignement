import mongoose, { Schema, Document } from 'mongoose';
interface ICinema extends Document {
  cinemaName:String,
  seats: number[];
}

const cinemaSchema = new Schema<ICinema>({
  cinemaName:{
    type:String,
    required:true
  },
  seats: [Number],
});
export const Cinema = mongoose.model<ICinema>('Cinema', cinemaSchema);

module.exports = {Cinema}
