import { Schema, model, models } from 'mongoose';

export interface IChampion {
  id: string,
  name: string,
  riotVersion: string
}

const schema = new Schema<IChampion>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  riotVersion: { type: String, required: true }
});

// This means to check if we've compiled the model before exporting it
// This happens  in the "hot reloading" that Next.js does
export default models.Champion || model<IChampion>('Champion', schema);
